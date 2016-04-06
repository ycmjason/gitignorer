module.exports = function(files){
  return files.map((file) => file.trim()) // trim white spaces
              .filter((file) => file != '') // remove empty arr
              .sort()
              .filter((file, i, ary) => (!i || file != ary[i - 1])); // remove duplicates

}
