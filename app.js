#!/usr/bin/env node
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

const encryption = require('./encryption');


function main() {
    /*
     * Listen for user input, and copy the
     * generated password to the system's
     * clipboard in the callback function.
     */
    const proptList = [{
            type: 'password',
            message: 'Your password >>>',
            name: 'password'
        },
        {
            type: 'input',
            message: 'Domain name :',
            name: 'domain',
        },
        {
            type: 'input',
            message: 'Length of password :',
            name: 'length',
            default: 20
        }
    ]

    inquirer.prompt(proptList).then(output => {
        try {
            var {
                'domain': domain,
                'password': password,
                'length': length
            } = output;
            var secret = encryption(domain, password, length);
            clipboardy.writeSync(secret);
            console.log('Password has been copied to clipboard !');
        }
        catch(err) {
            console.log('[Error]', err);
        }
    })
}

main()
