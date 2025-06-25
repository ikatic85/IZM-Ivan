import React from 'react';
const Footer = () => {

    return (
        <footer className="container-fluid">
	<div className="row">
		<div className="col-lg-6 col-md-12 col-6">
			<img src="img/morent-logo.svg"/>
			<p className="max-290">Our vision is to provide convenience and help increase your sales business.</p>
		</div>
		<div className="col-lg-2 col-md-4 col-6">
			<h4>About</h4>
			<ul>
				<li><a href="">How it works</a></li>
				<li><a href="">Featured</a></li>
				<li><a href="">Partnership</a></li>
				<li><a href="">Bussiness Relation</a></li>
			</ul>
		</div>
		<div className="col-lg-2 col-md-4 col-6">
		<h4>Community</h4>
			<ul>
				<li><a href="">Events</a></li>
				<li><a href="">Blog</a></li>
				<li><a href="">Podcast</a></li>
				<li><a href="">Invite a friend</a></li>
			</ul>
		</div>
		<div className="col-lg-2 col-md-4 col-6">
		<h4>Socials</h4>
			<ul>
				<li><a href="" target="_blank">Discord</a></li>
				<li><a href="" target="_blank">Instagram</a></li>
				<li><a href="" target="_blank">Twitter</a></li>
				<li><a href="" target="_blank">Facebook</a></li>
			</ul>
		</div>
		<div className="col-12">
			<p className="border-bottom mt-3 mb-4"></p>
		</div>
	</div> 
	<div className="row copyright">
		<div className="col-md-6 text-center text-md-start">
			<p>©2022 MORENT. All rights reserved</p>
		</div>
		<div className="col-md-6 text-center text-md-end">
			<p>
			<a href="#">Privacy & Policy</a>
			<a href="#">Terms & Condition</a>
			</p>
		</div>
	</div>
</footer> 
    );
};
export default Footer;
