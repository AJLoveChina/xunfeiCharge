$(function () {
    let zhuziList = [];
    let zzW = 50,
        zzH = 120;
    let zzOffsetW = 30,
        zzOffsetH = 20;
    let container = $(".container");
    let guodaoW = 50;

    container.css({
        width: (zzW + zzOffsetW) * 4 + guodaoW,
        height: (zzH + zzOffsetH) * 4
    });
    for (let i = 0; i< 16; i++) {
        let zhuzi = $("<div class='zhuzi'>");
        zhuzi.width(zzW);
        zhuzi.height(zzH);
        let m = i % 4,
            j = Math.floor(i / 4);

        let top = (zzH + zzOffsetH) * m + zzOffsetH,
            left = (zzW + zzOffsetW) * j + zzOffsetW;

        if (j >= 2) {
            left += 50;
        }

        zhuzi.css({
            top,
            left,
            textAlign: 'center',
            color: '#ccc'
        });

        if (i <= 0) {
            zhuzi.html("不<br>可<br>用")
            zhuzi.addClass("disabled")
        } else{
            zhuzi.html("充<br>电<br>桩")
        }
        zhuzi.attr("index", (Math.abs(j - 3) * 4 + ((j % 2 == 1) ? (m + 1) : (4 - m))));
        container.append(zhuzi);
    }


    let chukou = $("<div class='chukou'>");
    chukou.css({
        width:30,
        height:20,
        left: container.width() / 2,
        bottom:-10,
        position:'absolute',
        background:'white'
    });
    container.append(chukou);


    $('.zhuzi').each((i, item) => {
        let list = [];
        item = $(item);
        let zhuziW = item.width(),
            zhuziH = item.height();
        let w = 15,
            h = 15;
        for (let i = 0; i < 10; i++) {
            let m = i % 5;
            let child = $("<div>");
            child.addClass("interface");
            child.css({
                top: zhuziH / 6 * (m + 1),
                width: w,
                height: h,
                fontSize: '12px',
                lineHeight: h + "px"
            });
            if (i < 5) {
                child.css({
                    left : -w / 2
                })
            } else {
                child.css({
                    right : -w / 2
                })
            }
            child.html(10 - i);
            item.append(child);
        }

    });

    let bianhao = {
        "1": 101968,
        "2": 101970,
        "3": 101864,
        "4": 101863,
        "5": 101975,
        "6": 101971,
        "7": 101978,
        "8": 101949,
        "9": 101973,
        "10": 101979,
        "11": 101948,
        "12": 101865,
        "13": 101614,
        "14": 1011615,
        '15': 1011616
    };

    $('.zhuzi .interface').click(function () {
        let zhuzi = $(this).parents('.zhuzi');
        let index = zhuzi.attr("index") + "";

        if (zhuzi.hasClass('disabled')) {
            return layer.msg("这个充电桩还没搞好")
        }

        layer.open({
            type: 1,
            title: `${bianhao[index]} - ${$(this).html()}号充电桩二维码`,
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: `<div style="padding:20px;"><p style="font-size:12px;line-height:20px;">扫描之后不知道自己的电瓶车插头编号<br>可以查看讯飞的那个小程序知晓<br>步骤:科大优享=>发现=>个人中心=>使用记录=>端口</p><div id="qrcode"></div></div></div>`
        });

        $('#qrcode').qrcode(`http://www.washpayer.com/userLogin?l=${bianhao[index]}&chargeindex=` + $(this).html());
    });



    $(".contact").click(function () {
        layer.msg("联系邮箱 : 735267452@qq.com", {
            time : 5000
        })
    })
});

