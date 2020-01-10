function getFileType(path) {
	return path.split('.').pop();
}

// const params = {
// 	title: '',
// 	desc: '',
// 	fonts: [
// 		''
// 	],
// 	css: [
// 		''
// 	],
// 	accent: '',
// 	body: ''
// };

exports.base = function(p) {

	const fontLinks = p.fonts.reduce(
		(acc, cur) => acc + `
	<link
		rel="preload"
		as="font"
		type="font/${getFileType(cur)}"
		href="${cur}"
		crossorigin
	/>
		`,
		''
	);

	const cssLinks = p.css.reduce(
		(acc, cur) => acc + `
	<link
		rel="stylesheet"
		type="text/css"
		href="${cur}"
	/>
		`,
		''
	);

	return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>${p.title ? `${p.title} - ` : ''}mattia.id</title>
		<link href=data:, rel=icon>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="Description" content="${p.desc}">
		${fontLinks}
		${cssLinks}
	</head>
	<body class="checkerboard">
		<main ${p.accent ? `class="${p.accent}"` : ''}>
			<header>
				<section id="tiltedTop">
					<div id="topText" class="bigShadow">
						<a href="/" id="homeLink" class="hoverFloat">
							<h1>Mattia Schiano</h1>
						</a>
						<aside id="socialLinks">
							<a
								id="git"
								href="https://github.com/matteron"
								aria-label="Github"
								class="hoverFloat slowWiggle"
							>
								<i class="icon i-github"></i>
							</a>
							<a
								id="twit"
								href="https://twitter.com/mattiaschiano_"
								aria-label="Twitter"
								class="hoverFloat slowWiggle"
							>
								<i class="icon i-twitter"></i>
							</a>
						</aside>
					</div>
					<svg
						version="1.1"
						viewBox="0 0 525 4"
						xmlns="http://www.w3.org/2000/svg"
						id="headerLine"
					>
						<g
							fill="none"
							fill-rule="evenodd"
							stroke-dasharray="12"
							stroke-linecap="round"
							stroke-opacity=".35"
						>
							<g
								transform="translate(-235 -369)"
								stroke="#222"
								stroke-width="4"
								id="headerLineColor"
							>
								<g transform="translate(237 320)">
									<path d="m0 51h550" />
								</g>
							</g>
						</g>
					</svg>
				</section>
				<nav>
					<ul class="bigShadow" id="navList">
						<li>
							<a
								href="/about.html"
								class="navLink ${p.title == 'About' ? 'location' : ''}"
							>
								<i class="icon i-user fastWiggle"></i>
								<span>About</span>
							</a>
						</li>
						<li>
							<a
								href="/projects.html"
								class="navLink${p.title == 'Projects' ? ' location' : ''}"
							>
								<i class="icon i-umbrella fastWiggle"></i>
								<span>Projects</span>
							</a>
						</li>
					</ul>
				</nav>
			</header>
			<article 
				class="smallShadow${p.title == 'projects' ? ' markdown' : ''}"
				${p.title == 'projects' ? 'id="projectList"' : ''}
			>
				${p.body}
			</article>
		</main>
	</body>
</html>
	`;
}

// const pList = [
// 	{
// 		name: '',
// 		desc: ''
// 	}
// ]

exports.projectList = function(pList) {

	const projectList = pList.reduce(
		(acc, cur) => acc + `
<section class="projectEntry">
	<div>
		img here ♪
	</div>
	<div class="projectInfo">
		<h3 class="projectTitle">
			<a href="projects/${cur.name}.html">${cur.name}</a>
		</h3>
		<p class="projectDesc">${cur.desc}</p>
	</div>
</section>
		`,
		''
	);

	return `
<h2>little of this and that</h2>
${projectList}
	`;
}
