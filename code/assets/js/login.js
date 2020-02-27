$(function () {
    // 只要导入了 layui.all.js 脚本，就可以使用 layui.form
    var form = layui.form
    var layer = layui.layer
    // 点击了注册的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide() // 隐藏
        $('.reg-box').show() // 展示
    })

    // 点击了登录的链接
    $('#link-login').on('click', function () {
        $('.login-box').show() // 展示
        $('.reg-box').hide() // 隐藏
    })

    // 自定义校验规则
    form.verify({
        // 键：值
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // 1. 通过形参，获取到确认密码框中的值
            // 2. 通过 jQuery 获取到密码框中的值
            var pwd = $('.reg-box [name=password]').val()
            // 3. 进行 if 判断
            if (value !== pwd) {
                // return 一个错误消息
                return '两次的密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            //指定请求的方式
            type: 'POST',
            //指定请求的地址
            url: 'http://www.liulongbin.top:3007/api/reguser',
            // 指定请求的数据
            data: $(this).serialize(),
            // 指定成功后的回调函数
            success: function (res) {
                if (res.status !== 0) {
                    //注册失败
                    return layer.msg(res.message);
                };
                // 注册成功 
                layer.msg('注册成功')

            }





        });
    });

    //监听登陆表单的提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                // 跳转之前，将服务器颁发的token字符串，持久化存到本地
                localStorage.setItem('token', res.token);
                // 跳转到后台首页
                location.href = '/code/index.html';
            }
        });
    });





})