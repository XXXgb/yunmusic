<template>
	<div class="paihang-box">
		<div class="bangdan" v-for="(item,index) in list" v-bind:key="item.id" @click="getsonglistdetail(index)">
			<div class="bangdan-img">
				<img v-bind:src="item.playlist.coverImgUrl">
			</div>
			<div class="bangdan-songlist">
				<ul>
					<li>1.  {{item.playlist.tracks[0].al.name}} - {{item.playlist.tracks[0].ar[0].name}}</li>
					<li>2.  {{item.playlist.tracks[1].al.name}} - {{item.playlist.tracks[1].ar[0].name}}</li>
					<li>3.  {{item.playlist.tracks[2].al.name}} - {{item.playlist.tracks[2].ar[0].name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import bus from './../../musichome/components/bus.js'
import {singerlistpaihang} from '../../../api/songlist.js'
export default{
	name: 'getpaihang',
	data(){
		return {
			list: [],
			priority: []
		}
	},

  created:function(){
    this.getoriginallist();
  },

	methods:{

		//获取原创榜单
		getoriginallist(){
			singerlistpaihang(2).then(res => {
				if(res.data.code == 200){
					this.list = [],
					this.list.push(res.data);
					this.getituneslist();
				}
			})
		},


		//获取iTunes榜
		getituneslist(){
			singerlistpaihang(8).then(res => {
				if(res.data.code == 200){
					this.list.push(res.data);
					this.getchinalist();
				}
			})
		},


		//获取内地TOP排行榜
		getchinalist(){
			singerlistpaihang(15).then(res => {
				if(res.data.code == 200){
					this.list.push(res.data);
					this.gethklist();
				}
			})
		},


		//获取话语金曲榜
		gethklist(){
			singerlistpaihang(17).then(res => {
				if(res.data.code == 200){
					this.list.push(res.data);
					this.gethiphoplist();
				}
			})
		},


		//获取uk排行周榜
		gethiphoplist(){
			singerlistpaihang(18).then(res => {
				if(res.data.code == 200){
					this.list.push(res.data);
				}
			})
		},


		//当点击排行榜时，先把排行榜的名字和背景保存到store中，以便优先list.vue头部优先渲染
		//再跳转到list中，由list.vue实现歌单列表的获取
		getsonglistdetail(index){
			//音乐不同页面歌单的name和picUrl和id格式不同，所以先对歌单的name、picUrl、id进行格式化，再存储到store中
			let name = this.list[index].playlist.name;
			let id = this.list[index].playlist.id;
			let picUrl = this.list[index].playlist.coverImgUrl;
			this.priority = {'name': name , 'id': id , 'picUrl': picUrl};
			this.$store.commit('priority',this.priority);
			this.$router.push({
					path: '/songlist'
			})
		},


	},

}
</script>

<style>
.paihang-box{
	width: 100%;
}
.bangdan{
	padding: 5px;
	border-bottom: 1px solid #e4e4e4;
  display: flex;
}
.bangdan-img{
	width:80px;
	height: 80px;
}
.bangdan-img img{
	width: 100%;
	height: 100%;
	border-radius: 3px;
}
.bangdan-songlist{
	max-width:70%;
}
.bangdan-songlist ul{
	padding: 0 0 0 10px;
	font-size: 12px;
	color: #2e3030;
}
.bangdan-songlist ul li{
	list-style: none;
	margin: 6px 0;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space:nowrap;
}
</style>
