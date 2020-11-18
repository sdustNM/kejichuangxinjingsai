import { get, post } from '../../utils/request'

//​获取论文成果
export function getArticleByID(params){
  return get('/Archieve_Article/getArticleByID', params)
}
//设置论文成果
export function setArticleByID(params){
  return post('/Archieve_Article/setArticleByID', params)
}
