/**
 * 渲染选择器弹窗并弹出
 * @param  {String} title            选择器标题
 * @param  {String} scrollBodyHTML   滚动主体HTML结构，用于渲染DOM
 * @param  {Function} okCall         将选中的值（value）传入回调函数
 * @param  {Function} cancelCall     回调函数
 */
function renderSelector(title, scrollBodyHTML, okCall, cancelCall) {
    // 第一步，组织HTML结构并append
    var selectorHTML = '<div class="weui-mask xx_mask"></div>' +
        '<div class="weui-dialog xx">' +
        ' <div class="weui-dialog__hd">' +
        ' <strong class="weui-dialog__title">' + title + '</strong>' +
        ' </div>' +
        ' <div class="weui-dialog__bd"><div class="xx_body">' +
        ' <ul><li></li>' + scrollBodyHTML + '<li></li></ul><div class="xx_indicate"></div>' +
        ' </div></div>' +
        ' <div class="weui-dialog__ft">' +
        ' <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default xx_cancel">取消</a>' +
        ' <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary xx_ok">确定</a>' +
        ' </div>' +
        '</div>',
        scroll = null,
        scrollBodyDOM = null, // 滚动主体区域DOM节点
        liHeight = 48, // li的高度
        scrollCall = function(that) { // 滚动中触发的交互
            var index = (-that.y) / liHeight + 1; // 头尾分别用了一个li填补
            var current = scrollBodyDOM.find("li").eq(index);
            current.addClass("selected").siblings().removeClass("selected");
        };
    $(document.body).append(selectorHTML);

    scrollBodyDOM = $(".xx_body");

    // 第二步，初始化scroll
    scroll = new IScroll(".xx_body", {
        snap : 'li', // 对齐li元素左上角
        probeType : 3
    });
    // 滚动时触发
    scroll.on("scroll", function(){
        scrollCall(this);
    });
    // 滚动结束时触发
    scroll.on("scrollEnd", function(){
        scrollCall(this);
    });

    // 第三步，绑定按钮的点击事件
    // 点击确定，获取所选的值，然后移除DOM，注销scroll，执行确定的回调函数，将值传出去
    $(".xx_ok").on("click", function(){
        var value = scrollBodyDOM.find(".selected").data("value");
        $(".xx, .xx_mask").remove();
        scroll = null;
        okCall && typeof okCall== "function" && okCall(value);
    });
    // 点击取消，移除DOM，注销scroll，执行取消的回调函数
    $(".xx_cancel").on("click", function(){
        $(".xx, .xx_mask").remove();
        scroll = null;
        cancelCall && typeof cancelCall== "function" && cancelCall();
    });

    // 设置动画样式
    $(".xx_mask").addClass("xx_mask_visible");
    $(".xx").addClass("xx_visible");
}