<template>
			<!-- 品质保障，私人定制等-->
			<div>
			<div class="clearfix"></div>
		<footer class="footer">
			<div>
			<div class="text-center rights container">
				<div class="col-md-offset-2 col-md-2">
					<span class="fa fa-thumbs-o-up"></span>
					<p>品质保障</p>
				</div>
				<div class="col-md-2">
					<span class="fa fa-address-card-o"></span>
					<p>私人订制</p>
				</div>
				<div class="col-md-2">
					<span class="fa fa-graduation-cap"></span>
					<p>学生特供</p>
				</div>
				<div class="col-md-2">
					<span class="fa fa-bitcoin"></span>
					<p>专属特权</p>
				</div>
			</div>
			<!--联系我们、下载客户端等-->
			<div class="container beforeBottom">
				<div class="col-md-offset-1 col-md-3">
					<div><img src="../pictures/logo.png" alt="" class="footLogo" /></div>
				</div>
				<div class="col-md-4 callus text-center">
					<div class="col-md-4">
						<ul>
							<li>
								<a href="#">
									<p>买家帮助</p>
								</a>
							</li>
							<li><a href="#">新手指南</a></li>
							<li><a href="#">服务保障</a></li>
							<li><a href="#">常见问题</a></li>
						</ul>
					</div>
					<div class="col-md-4">
						<ul>
							<li>
								<a href="#">
									<p>商家帮助</p>
								</a>
							</li>
							<li><a href="#">商家入驻</a></li>
							<li><a href="#">商家后台</a></li>
						</ul>
					</div>
					<div class="col-md-4">
						<ul>
							<li>
								<a href="#">
									<p>关于我们</p>
								</a>
							</li>
							<li><a href="#">关于圆心</a></li>
							<li><a href="#">联系我们</a></li>
							<li>
								<span class="fa fa-wechat"></span>
								<span class="fa fa-weibo"></span>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-md-4">
					<div class="col-md-5">
						<p>电脑商城客户端</p>
						<img src="../pictures/ios.png" class="lf">
						<img src="../pictures/android.png" alt="" class="lf" />
					</div>
				</div>
			</div>
			</div>
		</footer>
			</div>
</template>
<script>
export default {
    name:'myheader'
}
</script>
<style>
 /*图标加大 颜色*/
 .rights .fa {
 	font-size: 30px;
 	color: #667799;
 }
 /*图片小间距*/
 img {
 	margin: 1px;
 }
 /*超链接样式*/
 .callus a {
 	font-size: 12px;
 	text-decoration: none;
 	color: #666666;
 }
 /*底部填充高*/
 .bottom {
 	margin: 10px;
 }
 /*权益整行的颜色和填充*/
 .rights {
 	width: 100%;
 	padding: 50px;
 	background-color: #F2F2F2;
 }
 /*联系我们那一整行的填充*/
 .beforeBottom {
 	padding-top: 30px;
 }
</style>
