const got = require('got');
const { token } = require('./auth');

(async () => {
    try {
        const {body} = await got('https://api.lifx.com/v1/lights/all', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'json'
        })
        const bulb1 = body.find(bulb => bulb.id === 'd073d56477a0')
        if (bulb1) {
            await got('https://api.lifx.com/v1/lights/all/state', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'json',
                body: JSON.stringify({
                    selector: `id:${bulb1.id}`,
                    power: 'on'
                })
            })
        }

    } catch (e) {
        console.log(e);
    }
})()
