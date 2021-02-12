import React from 'react'

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}