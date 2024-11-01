const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const packageJson = require('../package.json')

describe('Version Command', () => {
    test('package.json has version', () => {
        expect(packageJson).toHaveProperty('version');
        expect(typeof packageJson.version).toBe('string');
        expect(packageJson.version.length > 0).toBe(true);
    });
    test('--version', async () => {
        const { stdout, stderr } = await exec('node bin/index.js --version');
        expect(stdout).toBe(`v${packageJson.version}\n`);
        expect(stderr).toBe('');
    })
    test('-v', async () => {
        const { stdout, stderr } = await exec('node bin/index.js -v');
        expect(stdout).toBe(`v${packageJson.version}\n`);
        expect(stderr).toBe('');
    })
})