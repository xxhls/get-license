import os from "os";
import ini from "ini";
import path from "path";
import fs from "fs-extra"
import question from "./question";
import { error, info, warn } from "../log";
import isGitconfigExists from "./isGitconfigExists";

interface IConfig {
    name: string;
    email: string;
}

const getConfig = async () => {
    const config: IConfig = {
        name: "username",
        email: "xxx@email.com",
    };

    // 检测是否存在 .gitconfig 文件
    const isExists = isGitconfigExists();
    if (isExists) {
        info("检测到 .gitconfig 文件");
        // 读取配置文件
        const configPath = path.join(os.homedir(), ".gitconfig");
        const configStr = fs.readFileSync(configPath, "utf-8");
        const configTemp = ini.parse(configStr);
        config.name = configTemp.user.name;
        config.email = configTemp.user.email;

        info(`用户名: ${config.name}`);
        info(`邮箱: ${config.email}`);
    } else {
        warn("未检测到 .gitconfig 文件");
        // 创建配置文件
        const name = await question("请输入用户名: ");
        const email = await question("请输入邮箱: ");

        config.name = name;
        config.email = email;
    }

    return config;
};

export default getConfig;
