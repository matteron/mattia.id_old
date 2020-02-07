<div class="postTitle">
    <date>September 5, 2019</date>
    <h2>Tono</h2>
    <div></div>
</div>

Work in progress, just updating with what I have so far.

**Picture of Current Tono Here**

Tono is basically just a record player which takes cartridges instead of vinyl.  In the age of streaming services making it easy to quickly put music on without thinking, I wanted a device that could mimic the deliberate ritual that comes with a record player, without the associated price.  (I'm sure if I add up all the money I sunk into developing this thing, I probably aggressively missed that goal.)

### Tono v1

**Picture of old Tono**

Pictured above is the original Tono.  I started it conceptualizing it some time in December 2017, and finalized it late March of the following year.

Compared to the current version, this was exceptionally quick development time.  I just got a raspberry pi 2B, a [HifiBerry DAC+ Pro](https://www.hifiberry.com/shop/boards/hifiberry-dac-pro/) and got to work making it play music.

At this point I had no idea what I was doing and the end product showed.  I ended up installing a whole media center os for the pi in order to get it to play music as I thought this was the *simplest* way.  At this point I have forgotten what the name of it was, but it's probably for the best.

So anyway, music was done and I had to get the thing to read play cartridges.  Since I was trying to keep costs down, I decided to make the system be based on an [RFID card reader](https://www.amazon.com/gp/product/B01CSTW0IA/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1).  So the music itself was stored on the pi's sd card, and it would just match the card up to the corresponding album.

The RFID cards themselves were pretty cheap in bulk.  I just needed a way to identify which card corresponded to which album, however I didn't just want to tape a picture of the album to the raw card, which started my [way too long] search for something that could hold both a [square] picture of the album and the card itself.  Finally I stumbled upon this market of [cheap plastic frames](https://www.amazon.com/Sunmns-Colorful-Picture-Fujifilm-Instant/dp/B07TDBQ6ZM/ref=pd_sbs_201_6/132-1168809-3464001?_encoding=UTF8&pd_rd_i=B07TDBQ6ZM&pd_rd_r=21b41ea2-88f3-4d59-a5b3-d2dcc246cb77&pd_rd_w=vgxPk&pd_rd_wg=tBj0o&pf_rd_p=7c0dad87-8a25-4c4f-9349-026039ea6cb3&pf_rd_r=W4DTHGK88MQP8RT7Q60N&psc=1&refRID=W4DTHGK88MQP8RT7Q60N) for polaroids, and very luckily Fujifilm made a type of film that was perfectly square (most are rectangles).

**Picture of two frames, one facing front, the other turned over.**

After a little trial and error, I got it to read the cards and start playing the correct album.

After that, I needed some buttons for the previous/next track and play/pause buttons. I was and still am very into the mechanical keyboard community, so I ended up going with [NovelKeys Jade Switches](https://novelkeys.xyz/collections/switches/products/novelkeys-x-kailh-box-thick-clicks?variant=3747938238504) as I wanted them to have a nice and crunchy click when interacting the device.  I bought some cheap blank keycaps to go with them and called it a day.

The final step was to get some sort of case designed.  At the time I had absolutely no CAD experience, but I did have a friend studying mechanical engineering who just bought a 3D printer who was very excited to help me.

**Find a picture of the original cad file**

We got the whole thing designed and printed, we then tried smoothing it out the print by giving an acetone bath, which arguable made it look way worse.

Now all that was left was to get everything shoved inside.

**Picture of the inside of tono 1**

Again, very little experience.  I just sort of haphazardly wired everything together.  The thing I'm the most ashamed/proud of is that little rats nest of white wires.  It's the common ground.  I just stripped one of the wires and started soldering all the other grounding wires to it.

But Tono v1 was complete!

**Front facing picture of tono1 with a cartridge**

I was exceptionally proud of it, and also extremely critical.  Terrible wiring and design aside, it had some immediate problems.  The first and most noticeable was that it was *slow*, like *really slow*.  It would take a minute plus just to boot, and then after that would take forever to read and start playing the album.  Trying to remove a cartridge would sometimes not register and so wouldn't pause the music, and then sometimes inserting a new cartridge wouldn't change the album and just continue playing the current album, even if the RFID reader was correctly reading the album id.

However these were all manageable problems, so I ignored them and carried on.  School was picking up again so I had to focus up and forget about it.

### Tono v2
