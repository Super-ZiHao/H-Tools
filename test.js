import fs from 'fs';

const info = {};
fs.readFile('package.json', 'utf8', function(err, data) {
  if (err) {
    console.error('读取文件时出错：', err);
    return;
  }

  const packageInfo = JSON.parse(data);
  const dependencies = packageInfo.dependencies || {};

  Object.keys(dependencies).forEach(packageName => {
    const version = dependencies[packageName][0] === '^' ? dependencies[packageName].substr(1) : dependencies[packageName];
    info[packageName] = version;
  });
});
