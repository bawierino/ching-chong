import { Word } from "./structures/word";
import { characters } from "./characters";
import { hashify } from "../utils/hashify";

type RawWordsObject = { [propName: string]: Omit<Word, "characters" | "id"> };
type WordsObject = { [propName: string]: Word };

const rawWords: RawWordsObject = {
    你好: { meaning: "hello" },
    再见: { meaning: ["bye", "goodbye"] },
    什么: { meaning: "what", remarks: "replace with word you are asking for" },
    一二三四: { meaning: "1, 2, 3, 4", remarks: "IH AH SEN TZÜÜÜ" },
    人人: { meaning: ["everyone", "every person"] },
    大人: {
        meaning: ["adult", "grown-up"],
        remarks: "title of respect toward superiors"
    },
    小人: {
        meaning: ["I, me (used to refer humbly to oneself)", "nasty person", "villain"]
    },
    大小: { meaning: ["dimension", "magnitude", "size"] },
    小狗: { meaning: ["puppy"] },
    火山: { meaning: ["volcano"] },
    冰山: { meaning: ["iceberg"] },
    山水: {
        meaning: ["scenery", "landscape", "water from a mountain", "mountains and rivers"]
    },
    大雨: { meaning: ["heavy rain"] },
    父母: { meaning: ["father and mother", "parents"] },
    父子: { meaning: ["father and son"] },
    父女: { meaning: ["father and daughter"] },
    母子: { meaning: ["mother and son"] },
    母女: { meaning: ["mother and daughter"] },
    子女: { meaning: ["sons and daughters", "children"] },
    大众: {
        meaning: ["the masses", "the great bulk of the population", "popular"]
    },
    森林: { meaning: ["forest"] },
    水晶: { meaning: ["crystal"] },
    出众: { meaning: ["to stand out", "outstanding"] },
    回家: { meaning: ["to return home"] },
    出口: { meaning: ["an exit"] },
    火山口: { meaning: ["volcanic crater"] },
    不大不小: { meaning: ["neither big nor small"] },
    门口: { meaning: ["doorway", "gate"] },
    家人: { meaning: ["family member", "family"] },
    风雨: { meaning: ["rainstorm", "storm", "tempest"] },
    主人: { meaning: ["master", "host", "owner"] },
    大王: { meaning: ["king"] },
    女王: { meaning: ["queen"] },
    王子: { meaning: ["prince"] },
    猫王: { meaning: ["Elvis Presley"] },
    山羊: { meaning: ["goat"] },
    中国: { meaning: ["China"] },
    美国: { meaning: ["USA"] },
    木瓜: { meaning: ["papaya "] },
    水果: { meaning: ["fruit"] },
    油田: { meaning: ["oil field"] },
    水田: { meaning: ["paddy field", "rice field"] },
    冬天: { meaning: ["winter"] },
    呆子: { meaning: ["fool", "sucker"] },
    爸爸: { meaning: ["dad"] },
    妈妈: { meaning: ["mom"] },
    妹妹: { meaning: ["younger sister"] },
    闪人: { meaning: ["to sneak out"] },
    水果刀: { meaning: ["fruit knife"] },
    国家: { meaning: ["country", "nation", "state"] },
    国王: { meaning: ["king"] },
    休火山: { meaning: ["dormant volcano"] },
    住家: { meaning: ["residence", "household", "to reside"] },
    保母: { meaning: ["nanny"] },
    三点半: { meaning: ["3 and a half o'clock"] },
    手心: { meaning: ["palm", "control"] },
    身体: { meaning: ["the body", "one's health"] },
    星星: { meaning: ["star"] },
    海洋: { meaning: ["ocean"] },
    东西南北: { meaning: ["all directions"] },
    东西: { meaning: ["thing", "stuff", "something"] },
    小吃: { meaning: ["street food", "snack"] },
    大吃: { meaning: ["to gobble"] },
    好吃: { meaning: ["tasty", "delicious"] },
    工人: { meaning: ["worker"] },
    手工: { meaning: ["handmade", "handwork", "manual"] },
    女士: { meaning: ["lady", "madam"] },
    海马: { meaning: ["sea horse"] },
    海龟: { meaning: ["sea turtle"] },
    女巫: { meaning: ["witch"] },
    男巫: { meaning: ["wizard", "warlock"] },
    去中国: { meaning: ["go to China"] },
    有人: { meaning: ["there is someone", "occupied (i.e. restroom)"] },
    去美国: { meaning: ["go to the USA"] },
    白天: { meaning: ["daytime", "during the day"] },
    天气: { meaning: ["weather"] },
    雷雨: { meaning: ["thunderstorm"] },
    雪人: { meaning: ["snowman", "yeti"] },
    足球: { meaning: ["football", "a football"] },
    球门: { meaning: ["goalmouth"] },
    朋友: { meaning: ["friend"] },
    网友: { meaning: ["online friend"] },
    女朋友: { meaning: ["girlfriend"] },
    男朋友: { meaning: ["boyfriend"] },
    上车: { meaning: ["to get on into (a bus, train, car etc.)"] },
    下车: { meaning: ["to get off or out of (a bus, train, car etc)"] },
    七上八下: { meaning: ["unsettled", "perturbed state of mind"] },
    上海: { meaning: ["Shanghai"] },
    户口: { meaning: ["population", "registered residence"] },
    孙女: { meaning: ["granddaughter"] },
    孙子: { meaning: ["grandson"] },
    生女: { meaning: ["give birth to a baby girl"] },
    生男: { meaning: ["give birth to a baby boy"] },
    安心: { meaning: ["at ease", "to feel relived"] },
    水灾: { meaning: ["flood", "flood damage"] },
    火灾: {
        meaning: ["fire disaster", "fire (that burns in i.e. a building)"]
    },
    未来: {
        meaning: ["future", "tomorrow", "approaching", "coming", "pending"]
    },
    来日: { meaning: ["future days", "the next day"] },
    生日: { meaning: ["birthday"] },
    回来: { meaning: ["to return", "to come back"] },
    来回: { meaning: ["to make a round trip", " back and forth"] },
    品味: { meaning: ["to taste", "tasteful", "one's taste", "good taste"] },
    人品: { meaning: ["morality", "character", "personality"] },
    口味: { meaning: ["flavor"] },
    女人味: { meaning: ["feminine"] },
    中国茶: { meaning: ["Chinese tea"] },
    大米: { meaning: ["husked rice"] },
    仙人: { meaning: ["celestial being"] },
    大伙: { meaning: ["folks", "everybody", "everyone", "we all"] },
    仙子: { meaning: ["fairy"] }
};

function buildWords(rawWords: RawWordsObject): WordsObject {
    const result: WordsObject = {};
    Object.entries(characters).forEach(entry => {
        result[entry[0]] = { characters: [entry[1]], ...entry[1] };
    });
    Object.entries(rawWords).forEach(entry => {
        result[entry[0]] = {
            ...entry[1],
            characters: entry[0].split("").map(characterIdentifier => characters[characterIdentifier]),
            id: hashify(entry[0])
        };
    });
    return result;
}

export const words = buildWords(rawWords);
