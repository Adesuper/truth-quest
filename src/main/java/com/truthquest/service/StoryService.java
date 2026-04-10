package com.truthquest.service;

import com.truthquest.model.BibleVerse;
import com.truthquest.model.Story;
import com.truthquest.model.StoryScene;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {

    public Story getStory() {
        List<BibleVerse> verses = List.of(
                new BibleVerse(
                        "Exodus 20:16",
                        "You shall not give false testimony against your neighbor."
                ),
                new BibleVerse(
                        "John 14:6",
                        "Jesus answered, 'I am the way and the truth and the life. "
                                + "No one comes to the Father except through me.'"
                )
        );

        List<StoryScene> scenes = List.of(
                new StoryScene(
                        1,
                        "Sam loved playing ball inside the house even though Mom always said, "
                                + "'Sam, please play outside with the ball.' One sunny afternoon, "
                                + "while Mom was in the kitchen, Sam bounced the ball high in the "
                                + "living room. CRASH! The ball hit Mom's favorite vase — the one "
                                + "Grandma had given her — and it shattered into pieces on the floor.",
                        null,
                        null,
                        null
                ),
                new StoryScene(
                        2,
                        "Sam's heart was beating so fast. 'Oh no... what do I do?' Sam looked "
                                + "at the broken pieces and heard Mom's footsteps coming closer. "
                                + "Sam had two choices.",
                        "What should Sam do?",
                        null,
                        null
                ),
                new StoryScene(
                        3,
                        "THE TRUTH PATH: Sam took a deep breath and said, 'Mom, I'm really "
                                + "sorry. I was playing ball inside and I broke your vase. I know "
                                + "you told me not to, and I disobeyed. Please forgive me.'",
                        null,
                        "Mom knelt down and hugged Sam. 'Thank you for telling me the truth, "
                                + "sweetheart. I'm sad about the vase, but I'm so proud of you for "
                                + "being honest. That takes real courage. The Bible tells us that "
                                + "God loves truth — and so do I. We can work together to fix things, "
                                + "but trust is something we build by being truthful.' Sam felt a warm "
                                + "peace inside — the kind that comes from doing the right thing.",
                        null
                ),
                new StoryScene(
                        4,
                        "THE LIE PATH: Sam quickly kicked the broken pieces under the couch "
                                + "and pretended nothing happened. When Mom walked in and asked, "
                                + "'Sam, did you hear a crash?' Sam said, 'No, Mom. Maybe it was "
                                + "the cat.'",
                        null,
                        null,
                        "Later that evening, Mom found the broken pieces under the couch. She "
                                + "sat down with Sam and said, 'Sam, I found the vase. I'm not just "
                                + "sad about the vase — I'm sad that you didn't tell me the truth. "
                                + "When we lie, it breaks something even more important than a vase — "
                                + "it breaks trust. It takes a long time to build trust back.' Sam's "
                                + "tummy felt heavy with guilt. Sam wished they had just told the truth "
                                + "from the beginning."
                ),
                new StoryScene(
                        5,
                        "That night, Mom and Sam read the Bible together. Mom read Exodus 20:16: "
                                + "'You shall not give false testimony against your neighbor.' She "
                                + "explained, 'God gave us this commandment because He knows that truth "
                                + "is the foundation of love and trust. When we tell the truth, even "
                                + "when it's hard, we are following Jesus — who called Himself the Way, "
                                + "the Truth, and the Life.' Sam prayed, 'Dear Jesus, help me to always "
                                + "be brave enough to tell the truth, even when I'm scared. Amen.'",
                        null,
                        null,
                        null
                )
        );

        return new Story(
                "Sam and the Broken Vase — A Story About Telling the Truth",
                "This is a story about a child named Sam who learns why God wants us "
                        + "to always tell the truth, even when it's hard. It's based on the "
                        + "9th Commandment: 'You shall not give false testimony.' (Exodus 20:16)",
                scenes,
                verses,
                "Telling the truth builds trust. Lying breaks it. Jesus is the Truth "
                        + "(John 14:6), and when we follow Him, He gives us the courage to be "
                        + "honest — even when we're afraid. God always loves a truthful heart!"
        );
    }
}
