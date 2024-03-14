import fs from "fs-extra";
import getConfig from "./utils/getConfig";
import { info, debug, warn, error } from "./log";
import licenseMap from "./templates";
import { License } from "./templates";
import type { LicenseType } from "./templates";
import { Command } from "commander";

const main = async () => {
    const program = new Command();

    program
        .name("get-license")
        .description("Get License")
        .version("0.1.7");
    
    program
        .requiredOption("--license <license>", "Select License")
        .parse(process.argv);

    const options = program.opts();
    const { license } = options;

    if (!license) {
        error("未选择 License 类型");
        process.exit(1);
    } else if (license === "mit" || license === "MIT"){
        info("成功选择 MIT License");
        const generator = licenseMap[License.MIT];
        const config = await getConfig();
        const licenseStr = generator(config.name, config.email);
        const licensePath = `${process.cwd()}/LICENSE`;
        fs.outputFileSync(licensePath, licenseStr);
    } else {
        error("未知的 License 类型");
        process.exit(1);
    }

    // let generator: ((name: string, email: string) => string) | null = null;
    // let license: LicenseType | null = null;
    // const selectedLicense = (val: string) => {
    //     if (val === "mit" || val === "MIT") {
    //         info("成功选择 MIT License");
    //         license = License.MIT;
    //         generator = licenseMap[License.MIT];
    //     } else {
    //         error("未知的 License 类型");
    //         process.exit(1);
    //     }
    // }

    // const commander = new Command();
    // commander
    //     .option("--license <license>", "Select License", selectedLicense)
    //     .parse(process.argv);
    
    // console.log("license", license);
    // if (!license) {
    //     error("未选择 License 类型");
    //     process.exit(1);
    // }
    
    // const config = await getConfig();

    // if (!generator) { return 0;}
    // const licenseStr = generator(config.name, config.email);

    // const licensePath = `${process.cwd()}/LICENSE`;
    // fs.outputFileSync(licensePath, licenseStr);
};

main();
