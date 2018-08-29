let data =require('./data.js').data;
function sortData(property){
    return data.sort((a,b)=>{
        return a[property].localeCompare(b[property])
    })
}
function filterData(property,value){
    let filteredData=data.filter(a=>a[property]===value)
    return filteredData;
}

module.exports={sortData,filterData}
