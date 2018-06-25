// ======================================================
// Copyright © 2016. TIXSEE LLC. All Rights Reserved.
//
//
//
// * This software and associated documentation files (the “Software”) is
//
// * proprietary to Tixsee LLC.
//
// * All rights reserved. The methods and
//
// * techniques described herein are considered trade secrets
//
// * and/or confidential. Reproduction or distribution, in whole
//
// * or in part, is forbidden except by express written permission
//
// * of Tixsee LLC.
//
//     LICENSE RESTRICTIONS
//
// Except as expressly permitted under the License, or unless you have received prior written authorization from Tixsee LLC, you may not use, copy, modify, merge, publish, distribute, decompile, disclose, provide, create a derivative work of, or otherwise make available the Software.
//
//     Licenses may not be assigned, encumbered, sublicensed or transferred (whether directly or by operation of law) by the Licensee to any third party, and the Licensee will not grant any license, concession or other rights in or to any one or more of the Licenses to any third party.
//
//     /* See the file "LICENSE" for the full license governing this Software. */
//
//     The above copyright notice and this license notice shall be included in all copies or substantial portions of the Software.
//
// =============================================

var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
import services from './server/api/servicesRoutes'


app.use(express.static(__dirname));



app.use('/api/services', services);


app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'index.html'))
})


app.listen(process.env.PORT || 3001, function() {
    console.log('Server listening');
});