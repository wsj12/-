new Vue({//构造一个vue实例
	el:"#app",//挂载点
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false
	},
	filters:{//数据过滤器，转化为前端可识别的数据
		formatMoney:function(value) {
			return "￥" +value.toFixed(2);
		}
	},
	mounted:function(){//
    this.$nextTick(function  () {
	this.cartView();//

})
		
	},
	methods:{
		cartView:function  () {
			var _this = this;
			this.$http.get("data/cartData.json").then(function (res) {
//			console.log(res.data.status1);
//			console.log(res);
			_this.productList = res.data.result.list;
			_this.totalMoney = res.data.result.totalMoney;
			});


//			this.$http.get("data/cartData.json").then(res=>{
//
//			this.productList = res.data.result.list;
//			this.totalMoney = res.data.result.totalMoney;
//			});
	},
	changeMoney:function(product,way) {//改变商品数量
		if(way>0){
			product.productQuantity++;
		}
		else{
			product.productQuantity--;
			if(product.productQuantity<1)
			product.productQuantity=1;
		}
	},
	selectProduct:function (item) {//joisn里没有checked的字段
		if(typeof item.checked=='undefined')
		{ 
			Vue.set(item,"checked",true);
			
			
		}else{
			item.checked=!item.checked;
		}
	},
	checkAll:function (flag) {
		this.checkAllFlag = flag;
		var _this = this;
//		if(this.checkAllFlag){
			this.productList.forEach(function (item,index) {//forEach遍历商品列表

				if(typeof item.checked=="undefined")
					{ 
						Vue.set(item,"checked",_this.checkAllFlag);
						
						
					}else{
						item.checked=_this.checkAllFlag;
					}
			});
		}
	
	
	}
});
//全局过滤
Vue.filter("money",function  (value,type) {
	return "￥" +value.toFixed(2) +type;
})
