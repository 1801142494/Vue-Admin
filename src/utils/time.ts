 // 封装一个函数，获取结果是早上|上午|下午|晚上
 export const getTime =()=>{
    let hour =new Date().getHours()
    if(hour>=6&&hour<9){
        return '早上'
    }else if(hour>=9&&hour<12){
        return '上午'
    }else if(hour>=12&&hour<18){
        return '下午'
    }else{
        return '晚上'
    }
}