const Unionpay = require('../lib/unionpay');
const http=require('http');
const path= require('path');

const pfxPath = path.join(__dirname , 'pem/acp_test_sign.pfx');
const pfxPassword = '000000';
const merId = '777290058189438';
const cer = path.join(__dirname , 'pem/verify_sign_acp.cer');

(async () => {
    const unionPay = new Unionpay({
        merId : "777290058189438",
        frontUrl : "http://www.baidu.com/unionpay/notify",
        pfxPassword,
        pfxPath,
        cer,
        sandbox: true,
    });
    await unionPay.initKey();
    console.log('========:1:========');
    const tn = await unionPay.getAppTn({
        orderId: Date.now(),
        txnAmt: 10,
        orderDesc: "支付测试"
    });
    console.log('========:tn:========', tn);

    const html = await unionPay.getFrontTn({
        orderId: Date.now(),
        txnAmt: 10,
        orderDesc: "支付测试"
    });
    console.log('========::::========');
    console.log(html);

    http.createServer(function(requset,response){
        console.log('request come',requset.url)
        response.end(html)
    }).listen(7777)
    console.log('服务启动了~');
})();


