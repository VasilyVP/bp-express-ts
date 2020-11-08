/**
 * clear `build`,
 * copy src/public to `build`
 * copy .env to `build`
 */
const fse = require('fs-extra');

const source = './src';
const public = source + '/public';
const target = './build';
const targetPublic = target + '/public';

try {
    fse.emptyDirSync(target);

    // copying `public` if exists
    if (fse.pathExistsSync(public)) {
        fse.ensureDirSync(targetPublic);
        fse.copySync(public, targetPublic);
    }

    // copying .env
    fse.copySync(source + '/.env', target + '/.env');

    // adding data/logs to `build`
    fse.ensureDirSync(target + '/data/logs');
} catch (err) {
    console.error(err);
}