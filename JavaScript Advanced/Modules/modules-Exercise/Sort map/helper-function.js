function sortMap(map,sortMethod){

    let kvp=[...map]

    if(sortMethod){
        kvp.sort(sortMethod);
    }
    else{
        kvp.sort((a,b)=>{
            if(a[0]>b[0]){
                return 1
            }
            else if(a[0]<b[0]){
                return -1;
            }
            else{
                return 0;
            }
        })
    }

    let sortedMap=new Map(kvp);
    return sortedMap;
}
module.exports=sortMap
