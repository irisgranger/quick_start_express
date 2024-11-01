const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const packageJson = require('../package.json')

describe('Version Command', () => {
    test('package.json has version', () => {
        expect(packageJson).toHaveProperty('version');
        expect(typeof packageJson.version).toEqual('string');
        expect(packageJson.version.length > 0).toEqual(true);
    });
    test('--version', async () => {
        const { stdout, stderr } = await exec('node bin/index.js --version');
        expect(stdout).toEqual(`v${packageJson.version}\n`);
        expect(stderr).toEqual('');
    })
    test('-v', async () => {
        const { stdout, stderr } = await exec('node bin/index.js -v');
        expect(stdout).toEqual(`v${packageJson.version}\n`);
        expect(stderr).toEqual('');
    })
})