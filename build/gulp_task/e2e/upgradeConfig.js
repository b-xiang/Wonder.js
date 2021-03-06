var test = require("./test");
var gulp = require("gulp");
var fs = require("fs");
var git = require("gulp-git");

gulp.task("upgradeBaseCommitId", function (done) {
    var configFilePath = test.getE2eConfigFilePath();

    git.revParse({ args: "HEAD" }, function (err, commitId) {
        if (!!err) {
            test.fail(err, done);
            return;
        }

        var configJson = test.deepCopyJson(JSON.parse(fs.readFileSync(configFilePath)));

        configJson.render.base_commit_id = commitId;
        configJson.performance.base_commit_id = commitId;
        delete configJson.render.last_generate_based_commit_id;
        delete configJson.performance.last_generate_based_commit_id;

        fs.writeFileSync(configFilePath, JSON.stringify(configJson));

        done();
    });
});
