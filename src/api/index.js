import axios from 'axios'
//console.log(window.edd_campaign_config);

let { nonce, validate_api, submit_api } = window.edd_campaign_config

let sleep = ms => new Promise(res => setTimeout(() => res(), ms))

const validate = async data => {
    try {
        let response = {
            success: true,
            message: []
        }
        Object.keys(data.inputs).forEach(key => {
            if (data.inputs[key].trim() === '' || data.inputs[key].length < 8) {
                response.message.push(`${key} not valid!`)
                response.success = false
            }
            else {
                response.message.push(`${key} validation successful!`)
            }
        })
        await sleep(450)
        return response

        //let res = await axios.post(validate_api, { nonce, ...data })
        //return res.data
    }
    catch (error) {
        //console.log(error.message);
        return {
            success: false,
            message: [
                "Invalid redeem code",
                "Success messages",
            ]
        }
    }
}

const submit = async data => {
    try {
        //console.log({ nonce, ...data });
        //throw new Error('err')

        await sleep(750)

        return {
            success: true,
            message: [
                '<h4 style="color: red;">Submit Done</h4>',
                '<p style="color: blue;">Congratulations</p>',
                '<a href="#">This is a link</a>',
            ]
        }
        //let res = await axios.post(validate_api, { nonce, ...data })
        //return res.data
    }
    catch (error) {
        return {
            success: false,
            message: [
                "Invalid redeem code",
                "Success messages",
            ]
        }
    }
}

export default { validate, submit }