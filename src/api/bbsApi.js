import request from '@/utils/request';

export function getPostBrief(postId){
    return request({
      url:'bbsservice/posts/'+postId+'/brief',
      method:'get'
    })
  }
  
export function getReplies(postId,currentPage,params){
    if(!params["limit"]){
        params["limit"]=10;
    }
    return request({
        url:'bbsservice/posts/'+postId+'/replies/'+currentPage,
        method:'get',
        params:params
    })
}

export function postReply(postId,content){
    return request({
        url:'bbsservice/posts/'+postId+'/reply',
        method:'post',
        data:{
            content:content
        }
    })
}

export function postSubreply(replyId,content){
    return request({
        url:'bbsservice/replies/'+replyId+'/subreply',
        method:'post',
        data:{
            content:content
        }
    })
}

export function patchAttitude(postId,type){
    return request({
        url:'bbsservice/posts/'+postId+'/attitude',
        method:'patch',
        params:{
            type:type
        }
    })
}



export function getPosts(currentPage,params){
    if(!params["limit"]){
        params["limit"]=10;
    }
    return request({
        url:'bbsservice/posts/'+currentPage,
        method:'get',
        params:params
    })
}




  