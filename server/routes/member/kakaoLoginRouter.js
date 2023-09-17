const express = require('express')
const router = express.Router()
const Kakao = require('../../schemas/member/kakao')

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
const KAKAO_GRANT_TYPE="authorization_code"
const KAKAO_CLIENT_id="	32bb173e84c605e8ecffeddc779c6093"
const KAKAO_REDIRECT_URL="https://localhost8088/member/kakao"

router.get('/kakao', function (req, res, next) {
       const grant_type = KAKAO_GRANT_TYPE;
       const client_id = KAKAO_CLIENT_id;
       const redirect_uri = KAKAO_REDIRECT_URL;

        let code = req.query.code;
        try{
            axios.post(
                `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`
                , {
                 headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((result)=>{
                console.log(result.data['access_token'])
                // 토큰을 활용한 로직을 적어주면된다.
    
            }).catch(e=> {
                console.log(e)
                res.send(e);
            })
        }catch(e){
            console.log(e)
            res.send(e);
        }
})