const express = require('express')
const router = express.Router()
const Message = require('../schemas/message')
const Member = require('../schemas/member/member')

router.get('/showMessageList', async (req, res) => {
  console.log('메세지리스트조회 시작');
  try {

    console.log('보낸사람 쿼리스트링', req.query);
    getUserId = req.query.getUserId;
    let lists = [];


    // 메세지 리스트 보낸 아이디 모음
    const writerId = [];
    // 클라이언트에서 쿼리스트링으로 문자(Study등)를 보내 일치하는 걸로 실행

    lists = await Message.find({ "getUserId": getUserId });
    /* console.log('lists 확인0:', lists); */
    // 메세지 리스트 메세지 보낸사람 아이디 수집
    lists.forEach(list => {
      if (list.sendUserId) {
        writerId.push(list.sendUserId);
      }
    });
    // 작성자 정보 일괄 조회    
    const writerInfos = await Member.find({ id: { $in: writerId } });
    /* console.log('writerInfos 확인2', writerInfos); */
    let getWriterInformation = lists.map(list => {
      const writerInfo = writerInfos.find(info => info.id === list.sendUserId);
      /* console.log('writerInfos 확인3', writerInfo); */
      return {
        ...list.toJSON(),
        writerInfo: writerInfo.toJSON(),
      };
    });
    getWriterInformation = getWriterInformation.filter((list, index, self) =>
      index === self.findIndex((t) => (
        t.writerInfo.id === list.writerInfo.id
      ))
    );

    res.json({ lists: getWriterInformation });
    /* console.log('다됨?', lists);  */

  } catch (err) {
    console.log('에러 : ', err);
    res.json({ message: false })
  }
});

router.get('/showMessageListDetail', async (req, res) => {
  console.time('시간체크')
  try {
    const sendUserId = req.query.sendUserId;
    const getUserId = req.query.getUserId;
    console.log("디테일 센드아이디", sendUserId);
    console.log("디테일 겟아이디", getUserId);
    let lists = [];


    // 메세지 리스트 보낸 아이디 모음
    const writerId = [];
    lists = await Message.find({
      $or: [
        { sendUserId: sendUserId, getUserId: getUserId },
        { sendUserId: getUserId, getUserId: sendUserId }
      ]
    })
    
    /* console.log('lists 확인0:', lists); */
    // 메세지 리스트 메세지 보낸사람 아이디 수집
    lists.forEach(list => {
      if (list.sendUserId) {
        writerId.push(list.sendUserId);
      }
    });
    // 작성자 정보 일괄 조회    
    const writerInfos = await Member.find({ id: { $in: writerId } });
    console.timeEnd('시간체크')
    /* console.log('writerInfos 확인2', writerInfos); */
    const getWriterInformation = lists.map(list => {
      const writerInfo = writerInfos.find(info => info.id === list.sendUserId);
      /* console.log('writerInfos 확인3', writerInfo); */
      return {
        ...list.toJSON(),
        writerInfo: writerInfo.toJSON(),
      };
    });
    res.json({ lists: getWriterInformation });
    
  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }



});

router.post('/write', async (req, res) => {
  try {
    let obj;

    // 글 작성 시
    obj = {
      sendUserId: req.body.sendUserId,
      getUserId: req.body.getUserId,
      content: req.body.content,
    };
    const message = new Message(obj);
    await Message.insertMany(message);

    res.json({
      message: true,
    });
    // res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router