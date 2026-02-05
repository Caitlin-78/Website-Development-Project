export function imgPathEdit(path) {
    let index = 0;
    let imgName = "";
    while (index != -1) {
        imgName = path.substring(index + 1);
        index = path.indexOf("\\");
        console.log(imgName);

    }
    const newPath = `../public/${imgName}`
    console.log(newPath);
    return newPath;
}