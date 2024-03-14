#! /usr/bin/env node

import fs from "fs-extra";
import getConfig from "./utils/getConfig";
import { info, debug, warn, error } from "./log";
import licenseMap from "./templates";
import { License } from "./templates";
import type { LicenseType } from "./templates";
import { Command } from "commander";

const main = async () => {
    let license: LicenseType | null = null;
    const selectedLicense = (val: string) => {
        if (val === "mit" || val === "MIT") {
            info("成功选择 MIT License");
            license = License.MIT;
        } else {
            error("未知的 License 类型");
            process.exit(1);
        }
    }

    const commander = new Command();
    commander
        .option("--license <license>", "Select License", selectedLicense)
        .parse(process.argv);
    
    const config = await getConfig();

    const generator = licenseMap[license!];
    const licenseStr = generator(config.name, config.email);

    const licensePath = `${process.cwd()}/LICENSE`;
    fs.outputFileSync(licensePath, licenseStr);
};

main();
