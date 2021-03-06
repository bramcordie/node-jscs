/**
 * Requires an extra blank newline after var declarations, as long
 * as it is not the last expression in the current block.
 *
 * Type: `Boolean`
 *
 * Values: `true`
 *
 * #### Example
 *
 * ```js
 * "requirePaddingNewLineAfterVariableDeclaration": true
 * ```
 *
 * ##### Valid
 *
 * ```js
 * var x = {
 *     a: 1
 * };
 *
 * foo({
 *     a: {
 *         b: 1
 *     }
 * });
 * ```
 *
 * ##### Invalid
 *
 * ```js
 * var x = { a: 1 };
 * foo({a:{b:1}});
 * ```
 */

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(requirePaddingNewLineAfterVariableDeclaration) {
        assert(
            requirePaddingNewLineAfterVariableDeclaration === true,
            this.getOptionName() + ' option requires true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'requirePaddingNewLineAfterVariableDeclaration';
    },

    check: function(file, errors) {
        file.iterateNodesByType('VariableDeclaration', function(node) {
            var endOfDeclaration = file.findNextToken(file.getFirstNodeToken(node), 'Punctuator', ';');
            var nextToken = file.getNextToken(endOfDeclaration);

            if ((nextToken.type === 'Keyword' && nextToken.value === 'var') ||
                (nextToken.type === 'Punctuator' && nextToken.value === '}') ||
                nextToken.type === 'EOF') {
                return;
            }

            errors.assert.linesBetween({
                atLeast: 2,
                token: endOfDeclaration,
                nextToken: nextToken
            });
        });
    }

};
