<template>
    <div>
		<MyHeader/>
        <OrderHeader :activeNum="active" />
		<router-view/>
		<MyFooter/>
	</div>
</template>
<script>
import MyHeader from '@/components/header/myHeader.vue';
import MyFooter from '@/components/footer/myFooter.vue';
import OrderHeader from './component/orderHeader.vue';
import { mapState } from 'vuex';
export default {
    name:'order',
	components: { MyHeader, MyFooter ,OrderHeader},
	data(){
		return{

		}
	},
	computed:{
		...mapState(['active'])
	},
	methods:{
		
	}
}
</script>