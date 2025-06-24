

module.exports = async () => {
  let f = await ra("/function_tag_list"), F="";
  for(let y of f){
    F+=`${(await ra(`/function/${y}`)).tag} - ${(await ra(`/function/${y}`)).shortDescription}\n`;
    console.log(`Loadding ${y}`)
  };
  require("fs").writeFileSync('./prompt.txt', F)
}

async function ra(r) {let a=require("axios"),p="https://botdesignerdiscord.com/public/api",rs=(await a.get(p+r)).data;return rs} //send request to bdfd official api