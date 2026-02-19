import { pool, initDB } from './db.js';

await initDB();

// Clear existing data
await pool.query('DELETE FROM event_images');
await pool.query('DELETE FROM events');

// ─── Seed Events ────────────────────────────────────────────────────────────

const eventsData = [
  {
    title: 'ROOFTOP SOUND BATH & FREESTYLE',
    short_description: 'Singing bowls met open mic. We healed our nervous systems then destroyed them with bars.',
    full_description: `What happens when you put 40 strangers on a Brooklyn rooftop with singing bowls, a sound healer, and an open mic? Magic. That's what.

The evening started in stillness. Everyone lying on yoga mats, eyes closed, letting the vibrations wash through them. Some people cried. Some people fell asleep. One person laughed uncontrollably for three minutes straight and nobody judged them for it.

Then the second half hit. We flipped the energy completely. The same space that held silence now held bars, poetry, and freestyles that would make your jaw drop. Turns out, when you strip away people's armor with sound healing, what comes out on the mic is raw, honest, and absolutely electric.

The night ended with everyone exchanging numbers, making plans, and one guy who said it was the first time he'd felt "actually alive" in months. That's why we do this.`,
    day: '28',
    month: 'JAN',
    year: '2025',
    borough: 'BLR',
    play_type: 'SOUND',
    featured: 1,
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'MIDNIGHT CAPTURE THE FLAG',
    short_description: 'Central Park after dark. Two teams. One flag. Zero dignity. Sneakers were required.',
    full_description: `We turned Central Park into a battlefield at midnight and it was the most fun any of us had in years.

Two teams. Glow sticks for identification. One flag hidden somewhere in the Ramble. The rules were simple: find the flag, get it back to your base, don't get tagged. The execution was chaos in the best possible way.

Within five minutes, strangers were strategizing like they'd known each other for years. People who came alone were suddenly part of a team, shouting code names they'd made up on the spot, executing flanking maneuvers they'd seen in movies.

Someone climbed a tree. Someone else created a decoy operation that was genuinely impressive. The winning team celebrated like they'd won the World Cup. The losing team demanded a rematch.

By the end, 60 people who walked in as strangers left as a group chat that's still active today. That's the YOUNGBLOOD effect.`,
    day: '05',
    month: 'FEB',
    year: '2025',
    borough: 'BLR',
    play_type: 'MOVEMENT',
    featured: 1,
    images: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'STRANGERS DINNER PARTY',
    short_description: 'We cooked a meal with people we had never met. No phones. No small talk. Just real conversation.',
    full_description: `No phones allowed. No small talk allowed. Just 24 strangers, a kitchen full of ingredients, and three hours to cook and eat together.

We split everyone into groups of four. Each group was responsible for one course of the meal. The catch? No recipes. You had to figure it out together, with whatever ingredients were in front of you.

The conversations that happened while chopping vegetables and stirring pots were unlike anything you'd hear at a bar or a networking event. When your hands are busy and there's no phone to hide behind, people get real. Fast.

One table talked about grief. Another about what they wanted to be when they were kids versus what they became. Another group laughed so hard they burned their pasta and had to start over.

The meal itself was imperfect and beautiful. Some dishes were incredible, some were... experimental. But nobody cared. By dessert, people were sharing things they hadn't told their closest friends.

That's what happens when you remove the barriers. Food is just the excuse. Connection is the meal.`,
    day: '12',
    month: 'FEB',
    year: '2025',
    borough: 'BLR',
    play_type: 'CONNECTION',
    featured: 1,
    images: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1543353071-087092ec169a?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'GRAFFITI THERAPY',
    short_description: 'Licensed therapist + spray cans + a legal wall. We expressed what words could not.',
    full_description: `We paired a licensed therapist with spray cans and a legal wall, and what happened was one of the most powerful events we've ever hosted.

The format was simple: guided journaling prompts about things you're carrying, followed by translating those feelings onto the wall with spray paint. No artistic skill required. No judgment. Just expression.

Some people wrote words. Others painted abstract explosions of color. One person spent an hour on a single image that they said represented the anxiety they'd been carrying since college.

The therapist moved through the group, checking in, offering gentle prompts, holding space. It wasn't a therapy session and it wasn't an art class. It was something in between that we don't have a word for yet.

By the end, the wall was covered in a collective expression of everything these young people are carrying. It was heavy and it was beautiful. Multiple people said it was the first time they'd externalized feelings they'd been holding inside for years.

We're definitely doing this again.`,
    day: '19',
    month: 'FEB',
    year: '2025',
    borough: 'BLR',
    play_type: 'ART',
    featured: 1,
    images: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551913902-c92207136625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'SILENT DISCO YOGA',
    short_description: 'Vinyasa flow with three DJ channels in our headphones. Everyone picked their vibe.',
    full_description: `Three DJ channels. Wireless headphones. A rooftop at sunset. And yoga like you've never experienced it.

Channel 1 was chill ambient for the purists. Channel 2 was hip-hop beats for the people who want their warrior pose to hit different. Channel 3 was absolute chaos, a mix of everything from Bollywood to drum and bass, for the unhinged among us.

Watching 50 people do the same yoga flow to completely different music is hilarious and beautiful. Some people were flowing in slow motion while the person next to them was vibing to a beat drop.

The instructor gave cues through all three channels, but the energy of each group was completely different. The ambient crew was serene. The hip-hop crew was powerful. The chaos crew was... having the time of their lives.

After the flow, we all took off our headphones and just sat together in the silence, watching the sun go down. That contrast, from individual experience to collective stillness, hit different.

People kept their headphones on for the after-party. Dancing to three different songs in the same room is peak YOUNGBLOOD energy.`,
    day: '26',
    month: 'FEB',
    year: '2025',
    borough: 'BLR',
    play_type: 'MOVEMENT',
    featured: 1,
    images: [
      'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'POETRY SLAM IN THE DARK',
    short_description: 'Lights off. Mic on. Words only. The most vulnerable room we have ever built.',
    full_description: `We turned off every single light. The only thing visible was a dim red glow on the mic stand. And then people started talking.

The darkness changed everything. Without being seen, people said things they'd never say with the lights on. The poems were raw, unpolished, and devastatingly honest. About loneliness, about pressure, about the gap between who they are online and who they are at 3am.

Nobody clapped between poems. We asked them to snap instead, to keep the energy intimate. The sound of 40 people snapping in the dark after someone pours their soul out is something you don't forget.

Some people read from their phones. Some freestyled. One person just talked, stream of consciousness for four minutes, about what it feels like to be 22 and have no idea what you're doing. The room collectively exhaled because everyone felt that.

When we turned the lights back on, people looked at each other differently. There's something about hearing someone's truth in the dark that bonds you in a way small talk never could.`,
    day: '05',
    month: 'MAR',
    year: '2025',
    borough: 'BLR',
    play_type: 'EXPRESSION',
    featured: 0,
    images: [
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'SUNRISE HIKE & CONFESSIONS',
    short_description: 'We climbed a hill at 5am and told strangers our secrets at the top.',
    full_description: `Meeting at 5am sounds insane. 35 people showed up anyway. That tells you everything about the YOUNGBLOOD community.

The hike itself was beautiful but the real magic happened at the summit. We passed around a thermos of chai and took turns sharing one thing we'd never told anyone. The early morning, the exhaustion from the climb, the beauty of the view, it all conspired to make people brave.

Someone confessed they'd been pretending to love their job for two years. Someone else talked about a friendship they'd let die and regretted every day. Another person just said "I'm really scared of being alone" and the simplicity of it cracked the whole group open.

We watched the sunrise together in silence after that. 35 people who started as strangers, sitting on a hilltop, watching the sky change colors, feeling less alone than they had in months.

The group chat from this event is called "5am Friends" and they meet up every other week now on their own. That's community building itself.`,
    day: '12',
    month: 'MAR',
    year: '2025',
    borough: 'BLR',
    play_type: 'CONNECTION',
    featured: 0,
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'IMPROV NIGHT: NO EXPERIENCE NEEDED',
    short_description: 'We made fools of ourselves on stage and it was the most freeing thing ever.',
    full_description: `Nobody who signed up had any improv experience. That was the whole point.

We partnered with a local improv troupe who guided everyone through the basics: "yes, and", character work, scene building. But the real lesson was about letting go of the need to be cool.

The games started simple. Word association. One-word stories. Then escalated to full scenes where people were pretending to be aliens ordering coffee or having arguments about whose turn it was to walk an imaginary dog.

The laughter was constant and genuine. Not laughing at each other but laughing together, at the absurdity of it all, at the freedom of being silly with zero stakes.

By the end, people who walked in terrified of public speaking were volunteering for scenes. That transformation, from fear to freedom in two hours, is exactly what play does.

One participant messaged us after saying: "I haven't laughed that hard since I was a kid. I forgot what that felt like." That's the whole mission in one sentence.`,
    day: '19',
    month: 'MAR',
    year: '2025',
    borough: 'BLR',
    play_type: 'PLAY',
    featured: 0,
    images: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
    ],
  },
];

for (const event of eventsData) {
  const result = await pool.query(
    `INSERT INTO events (title, short_description, full_description, day, month, year, borough, play_type, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [event.title, event.short_description, event.full_description, event.day, event.month, event.year, event.borough, event.play_type, !!event.featured]
  );
  const eventId = result.rows[0].id;

  for (let i = 0; i < event.images.length; i++) {
    await pool.query(
      'INSERT INTO event_images (event_id, url, sort_order) VALUES ($1, $2, $3)',
      [eventId, event.images[i], i]
    );
  }
}

console.log('✅ Database seeded with', eventsData.length, 'events');
await pool.end();
