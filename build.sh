rm -rf dist
mkdir dist
dir="
./css/
./fonts/
"
for d in $dir
do
	mkdir dist/$d
done
rm -rf dist/dist

for h in pages/*
do
	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true $h > dist/$h
done

for c in css/*
do
  uglifycss $c > ./dist/$c
done

for f in fonts/*
do
	cp $f ./dist/$f
done

# squash scripts.js > ./dist/scripts.js
echo "Done Building :3"