import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [emojis, setEmojis] = useState([
        {
            emoji: '👍',
            count: 100,
            clicked: false
        },
        {
            emoji: '🤣',
            count: 0,
            clicked: false
        },
        {
            emoji: '🎊',
            count: 50,
            clicked: false
        }
    ]);

    const handleUpdateEmojiCount = index => {
        let cloneEmojis = JSON.parse(JSON.stringify(emojis));
        const previousAddedEmojiIndex = getPreviousAddedEmojiIndex();
        if (typeof previousAddedEmojiIndex === 'number') {
            cloneEmojis[previousAddedEmojiIndex].clicked = false;
            cloneEmojis[previousAddedEmojiIndex].count -= 1;
        }

        cloneEmojis[index].clicked = true;
        cloneEmojis[index].count += 1;

        setEmojis(cloneEmojis);
    };

    const getPreviousAddedEmojiIndex = () => {
        for (let i = 0; i < emojis.length; i++) {
            if (emojis[i].clicked) {
                return i;
            }
        }

        return false;
    };

    return (
        <>
            <Head>
                <title>emoji count</title>
                <meta name="description" content="emoji count" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <div className="buttons-container">
                {emojis.map(({ emoji, count, clicked }, index) => {
                    return (
                        <button
                            className={clicked ? 'active' : ''}
                            key={emoji}
                            onClick={() => handleUpdateEmojiCount(index)}>
                            {count} {emoji}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
