//#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const postPath = "http://www.lmagic.work:8800";
const main = () => {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "./component.config.json");
  const config = require(configPath);
  const file = fs.createReadStream(
    path.join(cwd, "./build/static/js/bundle.js")
  );

  const fileName = `${config.id}_${config.name}.component.js`;
  file.name = fileName;
  const formData = new FormData();
  formData.append(`component`, file);
  axios
    .post(`${postPath}/media/template/infor`, formData, {
      "Content-type": "multipart/form-data",
    })
    .then(
      (res) => {
        // 上传成功后的处理
        const filePath = `${postPath}/static/${fileName}`;
        return axios.post(`${postPath}/media/template/getComponentList`, {
          ...config,
          scriptPath: filePath,
        });
      },
      (err) => {
        // 出现错误时的处理
        console.log("添加失败");
      }
    )
    .then((res) => {
      console.log("上传成功");
    });
};

main();
