
import {
  emojisAmap,
  emojisBmap,
  emojiReg,
  emojiString,
  wChartReg,
  wChatEmojis,
  wChatToUi
} from './emjoydata'

// 解析emoji表情 以及换行回车
export default function parsingEmoji(value: string) {
  if (!value) return ''
  let str = value
  str = str.replace(/\n/gi, '<br>')
  // str = EmojiUnicode.trans(str);
  // var reg = /^\[.*\]$/gi;
  // eslint-disable-next-line no-useless-escape
  const reg = /\[+[^\[\]]+\]/g
  str = str.replace(reg, function (s) {
    s = s.split('[')[1].split(']')[0]
    if (emojiString.indexOf(s) !== -1) {
      return '<span class="chat-emoji emoji_b ' + emojisBmap['[' + s + ']'] + '" data-name="' + s + '"></span>'
    } else if (emojisAmap[s]) {
      return '<span class="chat-emoji emoji_a ' + emojisAmap[s] + '" data-name="' + s + '"></span>'
    } else {
      return '[' + s + ']'
    }
  })
  str = str.replace(emojiReg, function (emo: string) {
    emo = emo.replace(/\\/g, '\\')
    return '<span class="chat-emoji emoji_b ' + emojisBmap[emo] + '" data-name="' + emo + '"></span>'
  })
  // 微信emoji=》unicode表情规则
  str = str.replace(wChartReg, function (wCeo) {
    return '<span class="chat-emoji emoji_b ' + wChatEmojis[_escapeToUtf32(wCeo).toLocaleUpperCase()] + '" data-name="' + wChatToUi[_escapeToUtf32(wCeo).toLocaleUpperCase()] + '"></span>'
  })
  return str
}

// 编码转换
function _escapeToUtf32(str: string) {
  const escaped = []
  const unicodeCodes = _convertStringToUnicodeCodePoints(str)
  let i = 0
  const l = unicodeCodes.length
  let hex

  // eslint-disable-next-line semi-spacing
  for (;i < l;i++) {
    hex = unicodeCodes[i].toString(16)
    escaped.push('0000'.substr(hex.length) + hex)
  }
  return escaped.join('-')
}

function _convertStringToUnicodeCodePoints(str: string) {
  let surrogate1st = 0
  const unicodeCodes = []
  let i = 0
  const l = str.length

  // eslint-disable-next-line semi-spacing
  for (;i < l;i++) {
    const utf16Code = str.charCodeAt(i)
    if (surrogate1st !== 0) {
      if (utf16Code >= 0xDC00 && utf16Code <= 0xDFFF) {
        const surrogate2nd = utf16Code
        const unicodeCode = (surrogate1st - 0xD800) * (1 << 10) + (1 << 16) + (surrogate2nd - 0xDC00)
        unicodeCodes.push(unicodeCode)
      }
      surrogate1st = 0
    } else if (utf16Code >= 0xD800 && utf16Code <= 0xDBFF) {
      surrogate1st = utf16Code
    } else {
      unicodeCodes.push(utf16Code)
    }
  }
  return unicodeCodes
}
