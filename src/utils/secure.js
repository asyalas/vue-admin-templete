// import { DES } from 'app/env'
import CryptoJS from 'crypto-js'
import tripledes from 'crypto-js/tripledes'
import {DES} from './env'
const IV = CryptoJS.enc.Utf8.parse(DES.Iv)
const KEY = CryptoJS.enc.Utf8.parse(DES.Key)

const Des = new class CryptoDES {
  encrypt (message) {
    const result = tripledes.encrypt(message || '', KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encodeURIComponent(result)
  }

  decrypt (message) {
    const encryptedMessage = {
      ciphertext: CryptoJS.enc.Base64.parse(decodeURIComponent(message || ''))
    }
    const result = tripledes.decrypt(
      encryptedMessage,
      KEY,
      {
        iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      }
    )
    return result.toString(CryptoJS.enc.Utf8)
  }
}()

// admin
// UDuNlDebtWg=
export const passwordEncode = (p) => decodeURIComponent(Des.encrypt(p))

export default Des

export const decodeURL = (str) => str ? JSON.parse(Des.decrypt(str)) : ''
export const encodeURL = (input) => Des.encrypt(JSON.stringify(input))
