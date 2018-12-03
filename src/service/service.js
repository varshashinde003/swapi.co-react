export default class Service{
  static async getData(entity,page){
     try{
       let data = await fetch(`https://swapi.co/api/${entity}?page=${page}`)
       data = await data.json(data)
       return data
     }catch(e){
       console.error(e)
       throw e
     }
  }
  static async getDetails(url){
    try{
      let details = await fetch(`${url}`)
      details = await details.json(details)
      return details
    }catch(e){
      console.error(e)
      throw e
    }

  }
}