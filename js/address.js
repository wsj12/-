new Vue({
	el:".container",
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		shippingMethod:1
	},
	mounted:function  () {
		this.$nextTick(function  () {
			this.getAddressList();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList:function  () {
			var _this =this;
			this.$http.get("data/address.json").then(function (response) {
				var res = response.data;
				if(res.status=="0"){
					_this.addressList = res.result;
					console.log(res);
				}
			})
		},
		setDefault:function(addressId) {
			this.addressList.forEach(function (address,index) {
				console.log(address.addressId);
				if(address.addressId==addressId){
					address.isDefault=true;
				}
				else{
					address.isDefault=false;	
				}
			});
		}
//		loadMore:function  () {
//			this.limitNum=this.addressList.length;
//		}
	}
})
