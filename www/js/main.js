Main = {
    BOXID: "",
    country: "",
    offset: "",
    unixTime: "",
    profile: {},
    watchListData: '',

    // serverURL : 'https://go.bigandbig.ga,',

    serverURL: '',

    multiDNS: false,
    multiscreen: true,
    routing: true,
    pageType: '',
    domain: "",


    getDeviceID: function () {
        if (device && device.uuid) {
            return device.uuid;
        } else {
            return getBOXDetails();
        }
    },
    initialize: function () {
        Main.showSplash();



        setTimeout(function () {
            //		alert("ASDFASDFas");
            //					console.log("AAAAAA");

            Main.BOXID = Main.getDeviceID();
            // console.log(Main.BOXID);
            // import React from "react";
            // console.log(require('react').join(__dirname));
            //  require('react-window');






            // console.log(React);
            // console.log(render);
            // console.log(FixedSizeList);
            // console.log(AutoSizer);
            if (localStorage.getItem("profile") !== null) {

                Main.profile = JSON.parse(localStorage.getItem("profile"));
                // console.log(Main.profile);
                Main.hideSplash();
                hideValues();
                view = "homePage";
                $("#mainContent").html(Util.gridHomePage());
                $("#mainContent").show();

                // pushState(view,$('.imageFocus').attr("id"));
                // $('.imageFocus').removeClass("imageFocus");
                // view = "listUser";
                // hideValues();
                // $("#mainContent").html(Util.listUserPage());
                // $("#mainContent").show();


            }
            else {

                view = "signIn";
                Main.processNext();

                //                    if(localStorage.getItem("terms") !== null){
                //                         Main.HideLoading();
                //                         Main.hideSplash();
                //                         localStorage.removeItem('profile');
                //                         view = "signIn";
                //                         Main.processNext();
                //                    }
                //                    else{
                //                         view = "terms";
                //                         Main.processNext();
                //                    }

            }

        }, 400)


    },
    showSplash: function () {
        $("#splashContent").css("display", "block");
        $("#splashContent").html(Util.splashHtml());
    },
    hideSplash: function () {
        $("#splashContent").hide();
    }
}

var currentAPPType = 'api';

var termsData = '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />TERMS AND CONDITIONS OF USE</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />Please read these terms and conditions of Use (the Terms") carefully before using this </span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">WHMS Player Pro</span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> application (hereinafter- the "Application"). By using the application, you agree to bond to these Terms. If you do not agree to these or any portion thereof, you are strictly prohibited from using the Application.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />PERMITTED TO USE</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />Subject to these Terms, you are granted a limited, non- transferable, royalty free license to use the Application on a single device and solely for the intended purpose of the Application within its functionality as designed by the Application owners.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">You may not, and you are agree not to or enable others to, modify, copy (except as expressly permitted by these terms), decrypt, decompile, reverse engineer, disassemble, attempt to derive the source code of, or create derivative works of the Application or nay part thereof (except as and only o the extent any foregoing restriction is prohibited by Application law). You may not rent, lease, lend sell redistribute or sub-license the Application. You shall promptly report any errors in the operation of the Application to the Application owners. You shall immediately notify the Application owners of any third party infringement on the Application owners" rights in the Application of which you may become aware.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Are agree that the Application owners may from time to time download and install automatic updates of the Application.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />CONTENT</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />Any content data file, text, software, music phonographs, audio files, photos videos or any other form of audiovisual data) displayed by, stored on, or accessed through the Application belongs to the respective content owners. Such content may be protected by copyright or other intellectual property laws and trinities, and may be subject to terms of use of the third party providing such content. The Application may be used to reproduce content so long as such use is limited to reproduction of non-copyrighted content, content in which you own the copyright, or content you are authorised or legally permitted to reproduce. You further acknowledge that the Application owners are not responsible for examining or evaluating the content in any way, and it is your sole responsibility to abide by nay applicable intellectual property and other laws and regulations. You understand that by using the Application, you may encounter content that may be deemed offensive, indecent, or objectionable, which content may or may not be identified having explicit language, and that the result of any search or entering of a particular URL may automatically and unintentionally generate links or references to objectionable material. Nevertheless you are agree to use the Application at your sole risk, and that the Application owners, their affiliates, agents, principals, or licensors shall have no liability to you for content that may be found to be offensive, indecent, or objectionable.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />REPRESENTATIONS AND WARRANTIES</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">THERE IS NO WARRANTY FOR THE APPLICATION TO THE EXTENT PERMITTED BY THE APPLICABLE LAW. EXCEPT THEN OTHERWISE STATED IN THE WRITING, THE APPLICATIONS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, QUALITY, PERFORMANCE OR NON INFRINGEMENT UPON THE PATENT, TRADEMARK, COPYRIGHT OR OTHER-INTELLECTUAL PROPERTY RIGHTS OF ANY OTHER PARTY. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE APPLICATION IS WITH YOU. SHOULD THE APPLICATION PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL THE NECESSARY SERVICING, REPAIR OR CORRECTION. THE APPLICATION OWNERS MAKE NO WARRANTY THAT THE APPLICATION AND ALL OTHER MATERIALS RELATED THERETO WILL MEET YOUR SPECIFIC OBJECTIVES OR NEEDS OR THAT THE SAME WILL BE FREE FROM ERRORS OR BUGS. THE APPLICATION OWNERS MAKE NO WARRANTY THAT THERE WILL BE UNINTERRUPTED OPERATION OF THE APPLICATION. YOU ACKNOWLEDGE AND AGREE THE FOREGOING EXCLUSIONS AND DISCLAIMERS OF WARRANTIES ARE AN INTEGRAL PART OF THESE TERMS.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">IN NO EVENT WILL THE APPLICATION OWNERS BE LIABLE TO YOU FOR ANY DAMAGE, INCLUDING, BUT NOT LIMITS TO, ANY GENERAL SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE APPLICATION (INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES INCURRED BY YOU OR THIRD PARTIES OR A FAILURE OF THE APPLICATION TO OPERATE WITH ANY COMPUTER PROGRAMS), EVEN IF THE APPLICATION OWNERS HAVE BEEN ADVISED OF POSSIBILITY OF SUCH DAMAGES.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">If the disclaimer of warranty and limitation of liability provided above cannot be given local legal effect according to their terms, reviewing courts or government bodies shall apply local law that most closely approximates an absolute waiver of all civil liability in connection with the Application. If there is a mandatory minimum level of liability, this mandatory minimum level shall apply taking into account the absolute waiver of all civil liability in connection with the Application.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />TERMINATION</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />4.1 In the event that you (i) breach any of the terms and conditions of these Terms, or (ii) use the Application in a manner which is inconsistent with the license granted to you pursuant to these Terms, or (iii) you use the Application in a manner which is inconsistent with its functionality or intended purpose, or(iv) you attempt to assign, transfer or sub-license the Application owners which may be withheld, delayed, denied or conditioned by the Application owners in their sole discretion, then the Application owners may terminate these Terms immediately upon the provision of notice to you. upon termination of these Terms, you shall delete, uninstall and cease using the Application in any manner.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />INJUNCTIVE RELIEF</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">5.1 You acknowledge and agree that an actual or threatened violation by you of these Terms will cause the Application owners immediate and irreparable harm and injury which cannot be fully compensated by an award of damages or other remedies at law. Accordingly, you acknowledge and agree that in such case, the Application owners shall be entitled as a matter of right, to an injunction restraining any further violation by you of these Terms; such right to an injunction shall be cumulative and in addition to, but not in limitation of, any other rights that the Application owners may have at law or in the equity. This section shall survive the termination of these Terms, indefinitely.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />PRIVACY POLICY</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />6.1 You are hereby notified and agree that the Application owners may, for the purposes of improving performance and compatibility of the Application providing individual support, improving the experience of the Application use, preventing or addressing security or technical issues, or as otherwise required by the law, collect, process, and store unique identifiers and other user information, services usage information, contact information, log data, device information, geolocation information, third party services integrations.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6.2 The foregoing information may be also used for marketing or advertising purposes. You can opt out of these at any time by sending a notice to </span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">sales@whmcssmarters.com</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6.3 The Application owners receive user information from various sources, including information from: </span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">your requests for the Application owners" services;</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">your transactions with the Application owners, and</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">nonpublic information that you provide directly to the Application owners.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6.4 The Application owners use nonpublic information that they have about you, as described above, to give you superior products and services provide convenient access to products and services, and make a wider range of services available to you.he Application owners furnish your nonpublic information to their service providers and generically to serve the function of what the Application owners do. However the Application owners do not disclose your specific nonpublic information to other third-parties, except as otherwise described in these Terms.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6.5 The Application owners may disclose your nonpublic information as permitted by law. For example, the Application owners may share nonpublic information with regulatory authorities and law enforcement officials who have jurisdiction over the Application owners or if the Application owners are required to do so by </span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">India </span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">or other applicable law; provide nonpublic information to others to protect against fraud; and share with your consent. The Application owners also may share nonpublic information with firms they hire to market their services or with non affiliated companies with whom the Application owners have joint marketing agreements to provide you with offers of their services. These companies may receive user information, but they are restricted in its use and they are required to comply with all applicable federal, state and local laws.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6.6 When the Application owners share nonpublic information with companies working on the Application owners" behalf, the Application owners insist that such companies use the nonpublic information only to provide the services that the Application owners have asked them to perform. Within the Application owners, user information is available only to those individuals who may need to see it to fulfill and service the needs of their customers or the general function of the Application owners. the Application owners communicate regarding the need to protect nonpublic information to all employees and agents, especially to those individuals who have access to it. In addition, the Application owners have established and maintain physical, electronic and procedural safeguards to protect nonpublic information.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />NO LIABILITY FOR THIRD PARTY CLAIMS</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />7.1 The Application owners shall not be liable for claims made against the Application owners or you arising out of use of the Application and any materials related to thereto and you hereby agree to indemnify, defend and hold the Application owners and its members, officers, directors, shareholders, employees, agents and affiliates harmless from and against any and claims of every nature or type, that may be brought or asserted against the Application owners or nay of the Application owners" members, officers, directors, shareholders, employees, agents and their affiliates by any other party arising out of (i) your use of the Application and/ or (ii) your breach of your obligations, duties and responsibilities under these &nbsp;Terms, or (iii) any breach or default under any representations, warranties, guarantees or other written or oral statements made by or on behalf of you or any person under your control, including, without limitation, your agents.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">NOTICES</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">8.1 You consent to receive notices that may be required or describable to give under these Terms or in connection with it electronically by email or through the Application; in the latter case a notice will be displayed within the Application interface. Alternatively, the Application owners may notify by you placing a notice on the website </span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">http://whmcssmarters.com/. </span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">You</span> <span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">agree that any such notices that the Application owners send you electronically or place on the website will satisfy any legal communication requirements. Any notice required to be given to the Application owners under these Terms or in connection with it, shall be given to the following email address</span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">: sales@whmcssmarters.com. </span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Any notification given under or in connection with these Terms shall be made in English.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />GOVERNING LAWS. JURISDICTION</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />9.1 These Terms shall be governed and constructed in accordance with the laws of </span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">the India, </span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">without regard to the conflict of law principles thereof. In the event of a dispute arising under these Terms</span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">, the Supreme Court of Mohali / Chandigarh in India </span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">shall have co-exclusive jurisdiction to resolve such a dispute. These Terms shall not be governed by the </span><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">India Nations Convention or Contractors for the International Sale of Goods</span></strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">, the application of which is expressly excluded.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />NO ASSIGNMENT</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />10.1 Neither these Terms nor any interest in these Terms may be assigned or sub licensed by you without the prior express written approval of the Application owners, and any attempt by you to assign or sub-license these Terms or any interest herein without the prior express written approval of the Application owners shall be null, void and of no force and effect.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />ENTIRE AGREEMENT MODIFICATION</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />11.1 These Terms constitute the entire agreement between the parties hereto and terminate and supersede all prior understanding or agreements on the subject matter hereof. These terms may be modified by the Application owners at any time by providing to you a notice to this effect. Any further use of the Application will be subject to such modified Terms, and in case you do not accept these modified Terms, you will not be able t continue the use of the Application.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />SEVERABILITY</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">12.1 If any provision of these Terms is found by a court of competent jurisdiction or other valid tribunal to be invalid or otherwise unenforceable, the invalid or unenforceable provision shall be deemed amended to remove such provision, and the remaining Terms will be constructed to give maximum effect to the intention of the parties; in this event the Application owners shall also have the right to terminate these Terms immediately upon the provision of notice to you.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">SURVIVAL. NO WAIVER</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">13.1 Sections 3, 7, 8, 9 shall survive any termination or expiration of these Terms.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">13.2 No party"s waiver of any breach or accommodation to the other party shall be deemed to be a waiver of any subsequent breach by a party.</span></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />HEADING. INTERPRETATIONS</span></strong></p>'
    + '<p style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-family: Arial; color: #000000; background-color: transparent; font-weight: 400; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><br />14.1 Headings used in these terms are provided for convenience only and shall not be used to construe meaning intent. Except as otherwise provided herein, words used herein, regardless of the number and gender specifically used, shall be deemed and constructed to include any other member, singular or plural, and any other gender, masculine, feminine or neuter, as the context indicates as appropriate.</span></p>';
var homeLiveData = '', previousView = '';

var selectedContainer = '.ts';
var selectedTimeFormat = '24';
var openedMovieID = '';
var openedSeriesID = '';
var openedMovieCatID = '';
var openedMovieTrailer = '';
var openedSectionAction = '';
var fullEPGKeyboardOpened = false;
var openedMovieName = '';
var openedMovieExtension = '';
var intervalTesting = '';

var moviesLoadPerPage = 198;
var loadMore = 198;
var openedMultiScreen = "";

// var fileDataTemp = '';


var TMDB_BASE_URL = "https://api.themoviedb.org/3/";
var TMDB_IMAGE_BASE_URL_SMALL = "https://image.tmdb.org/t/p/w500/";
var TMDB_IMAGE_BASE_URL_LARGE = "https://image.tmdb.org/t/p/w1280/";
var TMDB_API_KEY = "f584f73e8848d9ace559deee1e5a849f";


const uiCloseButton = document.getElementById("close-btn");
const uiMinimizeButton = document.getElementById("minimize-btn");
const uiMaximizeButton = document.getElementById("maximize-btn");
const uiRestoreButton = document.getElementById("restore-btn");




// uiMaximizeButton.addEventListener("click", function (e) {
//     const { remote } = require('electron')
//     const electron = require('electron')
//     // remote.BrowserWindow.getFocusedWindow().minimize();



//     var window = electron.remote.getCurrentWindow();
//     window.setFullScreen(true);


// const BrowserWindow = require('electron').remote.BrowserWindow;


// BrowserWindow.getFocusedWindow().maximize();


//     hide(uiMaximizeButton);
//     show(uiRestoreButton);


//   }); 
//   uiRestoreButton.addEventListener("click", function (e) {
//     const { remote } = require('electron')
//     const electron = require('electron')
//     // remote.BrowserWindow.getFocusedWindow().minimize();



//     var window = electron.remote.getCurrentWindow();
//     // window.maximize();
//     // var width = window.screen.width;
//     // alert(width);

//     var screenElectron = electron.screen;

// var mainScreen = screenElectron.getPrimaryDisplay();
// var allScreens = screenElectron.getAllDisplays();
// // console.log(mainScreen.size.width);
// // console.log(mainScreen.size.height);


// window.setFullScreen(false);
// // window.setSize(mainScreen.size.width,mainScreen.size.height,true);

// show(uiMaximizeButton);
// hide(uiRestoreButton);
// const BrowserWindow = require('electron').remote.BrowserWindow;

// // window.setSize((mainScreen.size.width),(mainScreen.size.height),true);

// BrowserWindow.getFocusedWindow().restore();



//     });
// Close button
// uiCloseButton.addEventListener("click", function (e) { 

//     $(".overlay-screen").show();
//           showDateAndTime();
// //           localStorage.setItem("parentalFromHome","false");
// // alert("asdf");
//           pushState(view,$(".imageFocus").attr("id"));
//               $('.imageFocus').removeClass("imageFocus");
//               view = "exitApp";
//               $("#genericDiv").html(Util.showPopUp(2,'', "Do you want to Exit the Application ?", "Yes","No"));
//               $("#genericDiv").show();
//               $("#Btn-0").addClass("imageFocus");
//               Main.HideLoading();





//   });

//   Minimize button
//   uiMinimizeButton.addEventListener("click", function (e) {
//     // console.log("Click: minimize"); 
//     const { remote } = require('electron')
//     const electron = require('electron')
//     // remote.BrowserWindow.getFocusedWindow().minimize();

//     const BrowserWindow = require('electron').remote.BrowserWindow;


//     var window = electron.remote.getCurrentWindow(); 

//     // BrowserWindow.getFocusedWindow().minimize();

//     if(window.isFullScreen()){
//         window.setFullScreen(false);
//         show(uiMaximizeButton);
//         hide(uiRestoreButton);
//         setTimeout( function(){ 
//             // window.minimize();
//             BrowserWindow.getFocusedWindow().minimize();

//           }  , 1000 );
//     }else{
//         // window.minimize();
//         BrowserWindow.getFocusedWindow().minimize();

//     }


//   });



function hide(element) {
    element.style.display = 'none'
}
function show(element) {
    element.style.display = 'block'
}


if (localStorage.getItem("selectedContainer") !== null)
    selectedContainer = localStorage.getItem("selectedContainer");

if (localStorage.getItem("selectedTimeFormat") !== null)
    selectedTimeFormat = localStorage.getItem("selectedTimeFormat");

var parentPin = '';
if (localStorage.getItem("parentPin") !== null) {
    parentPin = localStorage.getItem("parentPin");
}
if (localStorage.getItem("currentAPPType") !== null) {
    if (Main.routing == true) {
        currentAPPType = localStorage.getItem("currentAPPType");
    } else {
        localStorage.setItem("currentAPPType", currentAPPType);
        currentAPPType = localStorage.getItem("currentAPPType");
    }
}





String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var stack = [];
Main.ShowLoading = function () {
    if ($("#splashContent").css("display") == "none") {

        //		if(view == "liveChannels"){
        //               try{
        //                    document.getElementById("smallLoading").style.display = "block";
        //               }
        //               catch(e){
        //
        //               }
        //		}
        //		else{
        document.getElementById("loading").style.display = "block";
        //		}
    }

}

Main.HideLoading = function () {
    document.getElementById("loading").style.display = "none";
    try {
        document.getElementById("smallLoading").style.display = "none";
    }
    catch (e) {

    }

}
device = {

}
var PlayUrl = '';
var callBack = '';
var cookieBoxNo = null;
var cookieSupported = false;
var view = '';
var deleteBoxPosition = '';
var deleteBoxType = '';
var selectedListBoxType = '';
var Generate = {}, previousFocus = '';;
Generate.event = function (keyCode) {
    var e = $.Event('ke$');
    e.which = keyCode;
    e.keyCode = keyCode;
    airMouse = true;
    Main.processTrigger(e);
}
function hideValues() {
    $("#SingleMoviePage").hide();
    $("#SingleCastPage").hide();
    $("#mainContent").hide();
    $("#signIn").hide();
    $("#customMessage").hide();
    $("#channelContent").hide();
    $("#profile").hide();
    $("#notification").hide();
    $("#genericDiv").hide();
    $("#genericDiv2").hide();
    homeFocus = '';

}
Main.showSuccess = function (msg) {

    if (view != "popUp")
        pushState(view, $(".imageFocus").attr("id"));
    view = "popUp";
    $("#customMessage").show();
    $("#customMessage").html(Util.showStatusPopUp(1, msg, "OK"));
};
Main.showFailure = function (msg) {
    var status = navigator.onLine;

    if (status == false) {
        if (view != "popUp")
            pushState(view, $(".imageFocus").attr("id"));

        view = "popUp";
        $("#customMessage").show();

        if (navigator.connection.type && navigator.connection.type.toUpperCase() != "NONE" && navigator.connection.type.toUpperCase() != "UNKNOWN")
            $("#customMessage").html(Util.showStatusPopUp(1, "Trouble connecting to Internet using " + navigator.connection.type.toUpperCase() + ", please Try again.", "Okay"));
        else
            $("#customMessage").html(Util.showStatusPopUp(1, "Trouble connecting to Internet, please Try again.", "Okay"));

        Main.HideLoading();
        /*callBack = function () {
            location.reload();
        }*/
    } else {
        if (view != "popUp")
            pushState(view, $(".imageFocus").attr("id"));
        view = "popUp";
        $("#customMessage").show();
        if (!msg)
            $("#customMessage").html(Util.showStatusPopUp(0, "Something went wrong", "OK"));
        else
            $("#customMessage").html(Util.showStatusPopUp(0, msg, "OK"));
        Main.HideLoading();
    }

};
Main.showMessage = function (msg) {
    $("#customMessage").show();
    $("#customMessage").html("<div id='showMessage'>" + msg + "</div>");
}
Main.showInfo = function (msg) {
    if (view != "popUp")
        pushState(view, $(".imageFocus").attr("id"));
    view = "popUp";
    $("#customMessage").show();
    $("#customMessage").html(Util.showStatusPopUp(2, msg, "OK"));
}
Main.processNext = function (event) {
    // alert(view);
    switch (view) {

        case "liveCatchupChannels": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                previousFocus = '';
            }
            Main.HideLoading();
            break;
        }
        case "homePage": {
            hideValues();
            stack = [];

            if (previousFocus) {


                if (previousFocus == 'listUser' && $("#listUser").length == 0) {
                    $("#mainContent").html(Util.gridHomePage());
                    $("#mainContent").show();
                    $('.imageFocus').removeClass("imageFocus");
                    $('#listUser').addClass("imageFocus");
                    previousFocus = '';
                } else if (previousFocus == 'moviesTile' && $("#moviesTile").length == 0) {
                    $("#mainContent").html(Util.gridHomePage());
                    $("#mainContent").show();
                    $('.imageFocus').removeClass("imageFocus");
                    $('#moviesTile').addClass("imageFocus");
                    previousFocus = '';
                } else if (previousFocus == 'seriesTile' && $("#seriesTile").length == 0) {
                    $("#mainContent").html(Util.gridHomePage());
                    $("#mainContent").show();
                    $('.imageFocus').removeClass("imageFocus");
                    $('#seriesTile').addClass("imageFocus");
                    previousFocus = '';
                } else if (previousFocus == 'homeLiveTile' && $("#homeLiveTile").length == 0) {
                    $("#mainContent").html(Util.gridHomePage());
                    $("#mainContent").show();
                    $('.imageFocus').removeClass("imageFocus");
                    $('#homeLiveTile').addClass("imageFocus");
                    previousFocus = '';
                } else if (previousFocus == 'switchUserIcon' && $("#switchUserIcon").length == 0) {
                    $("#mainContent").html(Util.gridHomePage());
                    $("#mainContent").show();
                    $('.imageFocus').removeClass("imageFocus");
                    $('#switchUserIcon').addClass("imageFocus");
                    previousFocus = '';
                } else {
                    $('#' + previousFocus).addClass("imageFocus");
                    $("#mainContent").show();
                    previousFocus = '';
                }
                $("#channelContent").html("").hide();

            }
            else {
                previousFocus = '';
                $("#mainContent").html(Util.gridHomePage());
                $("#mainContent").show();
                $("#channelContent").html("").hide();
            }

            break;
        }
        case "terms": {
            Main.hideSplash();
            $("#customMessage").html(Util.TermsPopUp(1, 'Terms of Use (EULA)', termsData, "Accept", ""));
            $("#customMessage").show();
            break;
        }
        case "account": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#profile").show();
                previousFocus = '';
            }
            else {
                $("#profile").html(Util.accountPage());
                $("#profile").show();
            }
            Main.HideLoading();
            break;
        }
        case "multiscreen": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#profile").show();
                previousFocus = '';
            }
            else {
                $("#profile").html(Util.multiscreenPage());
                $("#profile").show();

                //   Player.type = "live";
                //   Player.name = "Movie 1";
                //   setTimeout(function() { 
                //       Player.set_flowplayer1("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4",true); 
                //   }, 200);

                //   Player.type = "live";
                //   Player.name = "Movie 2";
                //   setTimeout(function() { 
                //       Player.set_flowplayer2("http://archive.org/download/CartoonClassics/Mel-O-Toons__Peter_and_the_Wolf.mp4",true); 
                //   }, 200);




            }
            Main.HideLoading();
            break;
        }
        case "settings": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#profile").show();
                previousFocus = '';
            }
            else {
                $("#profile").html(Util.settingsPage());
                $("#profile").show();

            }
            Main.HideLoading();
            break;
        }
        case "parentalPinSettings": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#genericDiv").show();
                previousFocus = '';
            }
            else {
                selectSetting = "parentControl";
                $("#genericDiv2").html(Util.settingSection());
                $("#genericDiv2").show();

                $('#pin').pincodeInput({
                    hideDigits: true, complete: function (value, e, errorElement) {

                    }
                });
                $('#cpin').pincodeInput({
                    hideDigits: true, complete: function (value, e, errorElement) {

                    }
                });
                $('#opin').pincodeInput({
                    hideDigits: true, complete: function (value, e, errorElement) {

                    }
                });

                if (selectSetting == "updateParentaControl") {
                    $('#opin').pincodeInput().data('plugin_pincodeInput').focus();
                } else {
                    $('#pin').pincodeInput().data('plugin_pincodeInput').focus();
                }

                //    if($("#opin").is(":visible")){
                // alert(view);
                //    }else{
                //        alert("not visible");
                //    }

            }
            Main.HideLoading();
            break;
        }

        case "seriesPlayer": {
            hideValues();
            //                      alert("aa");
            //                    if(previousFocus){
            //            			$('#'+previousFocus).addClass("imageFocus");
            //            			$("#genericDiv").show();
            //            			previousFocus = '';
            //            		}
            //            		else{
            //            			selectSetting = "parentControl";
            //            			$("#genericDiv2").html(Util.settingSection());
            //                       $("#genericDiv2").show();
            //                      }
            //                      Main.HideLoading();
            break;
        }
        case "parentalTurnOff": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#genericDiv").show();
                previousFocus = '';
            }
            else {
                selectSetting = "parentControlTurnOff";
                $("#genericDiv2").html(Util.settingSection());
                $("#genericDiv2").show();
                $('#opin').pincodeInput({
                    hideDigits: true, complete: function (value, e, errorElement) {

                    }
                });

                $('#opin').pincodeInput().data('plugin_pincodeInput').focus();
            }
            Main.HideLoading();
            break;
        }
        case "vodMovies": {
            $('.imageFocus').removeClass("imageFocus");
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#mainContent").show();
                previousFocus = '';
            }
            else {

                $("#mainContent").html(Util.listUserPage());
                $("#mainContent").show();

            }

            break;
        }
        case "listUser": {

            $('.imageFocus').removeClass("imageFocus");
            hideValues();
            contentView = view;
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#mainContent").show();
                previousFocus = '';
            }
            else {

                $("#mainContent").html(Util.listUserPage());
                $("#mainContent").show();

            }
            Main.HideLoading();
            break;
        }
        case "tvShows": {
            hideValues();
            stack = [];
            contentView = view;
            if (previousFocus && previousFocus.indexOf("tvShow") != -1) {
                if (previousFocus.indexOf("leftMenu") != -1)
                    view = "leftMenu";
                $('#' + previousFocus).addClass("imageFocus");
                $("#mainContent").show();
                previousFocus = '';
            }
            else {
                /* 	if(topMenu["tv"]){
                        Main.gettvShowSections(topMenu["tv"][0].id);
                    }
                    else{ */
                Main.getTopMenu("tv");
                //}
                previousFocus = '';

            }
            break;
        }
        case "liveChannels": {
            hideValues();

            if (previousFocus) {

                $('#' + previousFocus).addClass("imageFocus");
                $("#mainContent").show();
                previousFocus = '';
            }
            else {
                $("#mainContent").html('');
                $(".imageFocus").removeClass("imageFocus");
                $("#mainContent").html(Util.liveDetailsPage());

                Main.fetchAccToSortingLive();
                //  console.log(items);

                loadLiveData(liveSectionDetails);

                $("#liveChannel-0").addClass('imageFocus');
                $("#liveChannel-0").addClass('playing');
                playingIndex = 0;
                if (currentAPPType == "m3u") {
                    playingChannel = liveSectionDetails[0].url;
                } else {
                    playingChannel = liveSectionDetails[0].stream_id;
                    Main.getEPG(liveSectionDetails[0].stream_id);

                }
                $("#mainContent").show();
                playerLiveIndex = 0;
                Player.data = liveSectionDetails[0];

                if (currentAPPType == "m3u") {
                    playUrl = Player.data.url;
                } else {
                    if (Main.profile.server_info.server_protocol != "" && Main.profile.server_info.server_protocol == "https") {
                        playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[0].stream_id + selectedContainer;
                    } else {
                        playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[0].stream_id + selectedContainer;
                    }
                }



                Player.playStream(playUrl, true);
                //Main.getLiveStream(liveSectionDetails[0].stream_id);
            }
            break;
        }
        case "signIn": {
            hideValues();
            Main.hideSplash();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#signIn").show();
                previousFocus = '';
                Main.HideLoading();

            } else {
                $('.imageFocus').removeClass("imageFocus");
                $("#signIn").html(Util.signIn());
                $("#signIn").show();
                Main.HideLoading();
            }

            break;
        }
        case "tvShowDetail": {
            hideValues();
            contentView = view;
            if (previousFocus) {
                if (previousFocus.indexOf("leftMenu") != -1)
                    view = "leftMenu";
                $('#' + previousFocus).addClass("imageFocus");
                $("#SingleMoviePage").show();
                previousFocus = '';
            }

            break;
        }
        case "sections": {
            contentView = view;
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#channelContent").show();
                previousFocus = '';
            } else {
                $("#channelContent").html(Util.listSectionPage(sectionData));

                // categoriesSection(sectionData);
                var mainArray = [];

                for (var i = 0; i < sectionData.length; i++) {
                    var tempArray = [];

                    box = {
                        category_id: sectionData[i].category_id,
                        category_name: sectionData[i].category_name,
                        parent_id: sectionData[i].parent_id,
                        index_number: i,

                    }
                    tempArray.push(box);

                    if ((i + 1) < sectionData.length) {
                        i++;
                        box = {
                            category_id: sectionData[i].category_id,
                            category_name: sectionData[i].category_name,
                            parent_id: sectionData[i].parent_id,
                            index_number: i,

                        }
                        tempArray.push(box);
                    }

                    mainArray.push(tempArray);

                }
                mainArray.type = sectionData.type;
                mainArray.sectionType = sectionData.sectionType;


                categoriesSection(mainArray);

                $("#channelContent").show();
            }
            break;
        }
        case "multiscreenCategoriesSections": {
            contentView = view;
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus");
                $("#profile").show();
                previousFocus = '';
            } else {

                $("#multiscreenCategoriesSections").html(Util.listMultiScreenCategoriesPage(sectionData));
                // categoriesSection(sectionData);
                var mainArray = [];

                for (var i = 0; i < sectionData.length; i++) {
                    var tempArray = [];

                    box = {
                        category_id: sectionData[i].category_id,
                        category_name: sectionData[i].category_name,
                        parent_id: sectionData[i].parent_id,
                        index_number: i,

                    }
                    tempArray.push(box);

                    if ((i + 1) < sectionData.length) {
                        i++;
                        box = {
                            category_id: sectionData[i].category_id,
                            category_name: sectionData[i].category_name,
                            parent_id: sectionData[i].parent_id,
                            index_number: i,

                        }
                        tempArray.push(box);
                    }

                    mainArray.push(tempArray);

                }
                mainArray.type = sectionData.type;
                mainArray.sectionType = sectionData.sectionType;


                // console.log(sectionData);
                // console.log(mainArray);

                // console.log("Array Size: "+mainArray.length);
                // console.log("Array: "+mainArray[0][0].category_id);
                categoriesSection(mainArray);


                $("#multiscreenCategoriesSections").show();
                $("#profile").show();
            }
            break;
        }

        case "liveTvDetail": {
            contentView = view;
            if (previousFocus) {
                if (previousFocus.indexOf("leftMenu") != -1)
                    view = "leftMenu";
                $('#' + previousFocus).addClass("imageFocus");
                $("#SingleMoviePage").show();
                previousFocus = '';
            }
            Main.HideLoading();
            break;
        }
        case "settingSection": {
            if (previousFocus) {

                $('#' + previousFocus).addClass("imageFocus");
                $("#genericDiv").show();
                previousFocus = '';
            }
            else {
                $("#genericDiv2").html('');
                $("#genericDiv").html(Util.settingSection());
                $("#genericDiv").show();
            }
            break;
        }
        case "enterPin": {

            break;
        }
        case "singleMovie": {
            hideValues();
            if (previousFocus) {
                if (previousFocus.indexOf("leftMenu") != -1)
                    view = "leftMenu";
                $('#' + previousFocus).addClass("imageFocus");
                $("#SingleMoviePage").show();
                previousFocus = '';
            } else {
                $("#SingleMoviePage").html(Util.singleMovie());
                $("#SingleMoviePage").show();

                var cout = 1;
                try {
                    if (singleMovie.info.backdrop_path.length > 1) {
                        intervalTesting = setInterval(function () {
                            // alert(singleMovie.info.backdrop_path[1]);
                            $('#moviesPageBackground').css({ 'background': 'url("' + singleMovie.info.backdrop_path[cout] + '")', 'background-position': 'center', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-color': '#233035', 'background-blend-mode': 'overlay', 'width': '100vw', 'height': '100%' });
                            cout == singleMovie.info.backdrop_path.length - 1 ? cout = 0 : cout++;
                        }, 5000);
                    }
                } catch (e) {

                }

            }

            break;
        }
        case "singleCast": {
            hideValues();
            if (previousFocus) {
                if (previousFocus.indexOf("leftMenu") != -1)
                    view = "leftMenu";
                $('#' + previousFocus).addClass("imageFocus");
                $("#SingleCastPage").show();
                previousFocus = '';
            } else {
                $("#SingleCastPage").html(Util.singleCast());
                $("#SingleCastPage").show();

                $(document).ready(function () {
                    $('.popup-gallery').magnificPopup({
                        delegate: 'a',
                        type: 'image',
                        tLoading: 'Loading image #%curr%...',
                        mainClass: 'mfp-img-mobile',
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        },
                        image: {
                            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                            titleSrc: function (item) {
                                return item.el.attr('title') + '<small></small>';
                            }
                        }
                    });
                });

                //   var cout = 1;
                //   try{
                //   if(singleMovie.info.backdrop_path.length>1){
                //       intervalTesting = setInterval(function() {
                //           // alert(singleMovie.info.backdrop_path[1]);
                //       $('#moviesPageBackground').css({'background': 'url("' + singleMovie.info.backdrop_path[cout] + '")','background-position':'center','background-repeat':'no-repeat','background-size':'cover','background-color':'#233035','background-blend-mode':'overlay','width':'100vw','height':'100%'});
                //       cout == singleMovie.info.backdrop_path.length-1 ? cout = 0 : cout++;
                //       }, 5000);
                //   }
                //   }catch(e){

                //   } 

            }

            break;
        }
        case "player": {
            $('.imageFocus').removeClass("imageFocus");
            $("#SingleMoviePage").hide();
            $("#mainContent").hide();
            Player.playStream();
            break;
        }
        case "tvshowDetails": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus"); previousFocus = '';
                $("#SingleMoviePage").show();
            }
            else {
                $("#SingleMoviePage").html(Util.tvShowDetails());
                $("#SingleMoviePage").show();
                var cout = 1;
                try {
                    if (seriesPage.info.backdrop_path.length > 1) {
                        intervalTesting = setInterval(function () {
                            // alert(singleMovie.info.backdrop_path[1]);
                            $('#moviesPageBackground').css({ 'background': 'url("' + seriesPage.info.backdrop_path[cout] + '")', 'background-position': 'center', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-color': '#233035', 'background-blend-mode': 'overlay', 'width': '100vw', 'height': '100%' });
                            cout == seriesPage.info.backdrop_path.length - 1 ? cout = 0 : cout++;
                        }, 5000);
                    }
                } catch (e) {

                }
            }
            break;
        }
        case "search": {
            hideValues();
            if (previousFocus) {
                $('#' + previousFocus).addClass("imageFocus"); previousFocus = '';
            }
            $("#mainContent").show();
            $("#SingleMoviePage").hide();
            $("#SingleMoviePage").html();
            break;
        }
    }
}
Main.updateEpisodes = function (seasonID) {
    var Text = '';
    var keys = Object.keys(seriesPage.episodes);
    if (seriesPage.episodes[seasonID]) {
        var data = seriesPage.episodes[seasonID];
        for (var i = 0; i < data.length; i++) {
            Text += '<div class="">'
            Text += Util.tvEpisode(data[i], i, data.length);
            Text += '</div>'
        }
        $("#relatedSeries").html(Text);
        $("#seasonSelector").html("Season - " + (seasonID) + '<i class="fa fa-angle-down fa-1x" style="margin-left: 20px;"></i>');
        $("#seasonSelector").addClass("imageFocus");
        tvEPSIndex = 1;
    }
    else {
        Main.showFailure("No episodes available.");
    }

}

Main.ShowMenu = function (season) {
    if (view != "seasonsList")
        pushState(view, $(".imageFocus").attr("id"));
    $(".imageFocus").removeClass("imageFocus");
    view = "seasonsList";
    $("#customMessage").show();
    $("#customMessage").html(Util.showMenuPopUp(season, seriesPage.episodes, "Season"));
}


Main.processTrigger = function (event) {
    $('.mouseFocus').removeClass('mouseFocus');
    // console.log(view);
    if (true) {
        switch (view) {
            case "listUser": {
                Keyhandler.listUserKeyhandler(event);
                break;
            }
            case "account": {
                Keyhandler.accountKeyhandler(event);
                break;
            }
            case "settings": {
                Keyhandler.accountKeyhandler(event);
                break;
            }
            case "multiscreen": {
                Keyhandler.multiScreenKeyhandler(event);
                break;
            }
            case "settingSection": {
                Keyhandler.settingSectionKeyhandler(event);
                break;
            }
            case "parentalPinSettings": {
                Keyhandler.parentalPinSettingsKeyhandler(event);
                break;
            }
            case "parentalTurnOff": {
                Keyhandler.parentalPinTurnOffKeyhandler(event);
                break;
            }
            case "seriesPlayer": {
                Keyhandler.seriesPlayerKeyHandler(event);
                break;
            }
            case "catchupPlayer": {
                Keyhandler.catchupPlayerKeyHandler(event);
                break;
            }


            case "homePage": {
                Keyhandler.homeKeyhandler(event);
                break;
            }
            case "vodMovies": {
                Keyhandler.vodMoviesKeyhandler(event);
                break;
            }
            case "sections":
            case "multiscreenCategoriesSections": {
                Keyhandler.sectionKeyHandler(event);
                break;
            }
            case "liveCatchupChannels":
            case "liveMultiScreenChannels": {
                Keyhandler.liveCatchupChannelsKeyHandler(event);
                break;
            }

            case "liveCatchupPrograms": {
                Keyhandler.liveCatchupProgramsKeyHandler(event);
                break;
            }




            case "enterPin": {
                Keyhandler.enterPinKeyHandler(event);
                break;
            }
            case "enterPinMultiScreenCategories": {
                Keyhandler.enterPinMultiScreenCategories(event);
                break;
            }
            case "searchChannels": {
                Keyhandler.searchPopUpKeyHandler(event);
                break;
            }

            case "searchLiveCategories":
            case "searchMoviesCategories":
            case "searchSeriesCategories":
            case "searchCatchupCategories": {
                Keyhandler.searchCategoriesPopUpKeyHandler(event);
                break;
            }

            case "searchMovies": {
                Keyhandler.searchMoviesPopUpKeyHandler(event);
                break;
            }
            case "sortChannels": {
                Keyhandler.sortPopUpKeyHandler(event);
                break;
            }
            case "sortMovies": {
                Keyhandler.sortPopUpMoviesKeyHandler(event);
                break;
            }

            case "enterPinMovies": {
                Keyhandler.enterPinMoviesKeyHandler(event);
                break;
            }
            case "enterPinMoviesCategories": {
                Keyhandler.enterPinMoviesCategoriesKeyHandler(event);
                break;
            }
            case "enterPinSeries": {
                Keyhandler.enterPinSeriesKeyHandler(event);
                break;
            }

            case "singleMovie": {
                Keyhandler.singleMovieKeydown(event);
                break;
            }
            case "singleCast": {
                Keyhandler.singleCastKeydown(event);
                break;
            }
            case "tvshowDetails": {
                Keyhandler.tvshowDetailsKeydown(event);
                break;
            }
            case "popUp": {
                Keyhandler.descKeyhandler(event);
                break;
            }
            case "terms": {
                Keyhandler.descKeyhandler(event);
                break;
            }
            case "seasonsList": {
                Keyhandler.seasonsListKeyhandler(event);
                break;
            }
            case "liveChannels": {
                Keyhandler.liveTvKeydown(event);
                break;
            }
            case "player": {
                Player.playKeydown(event);
                break;
            }
            case "tvShows": {
                Keyhandler.tvShowsKeyDown(event);
                break;
            }

            case "confirmPin": {
                Keyhandler.confirmPinKeyDown(event);
                break;
            }
            case "tvShowDetail": {
                Keyhandler.tvShowDetailKeyhandler(event);
                break;
            }
            case "adultShowDetail": {
                Keyhandler.adultShowDetailKeyhandler(event);
                break;
            }
            case "signIn": {
                Keyhandler.signInKeyhandler(event);
                break;
            }
            case "profile": {
                Keyhandler.profileKeyhandler(event);
                break;
            }
            case "watchList": {
                Keyhandler.watchListKeyDown(event);
                break;
            }
            case "exitApp": {
                Keyhandler.exitKeyhandler(event);
                break;
            }
            case "parentalFromHome": {
                Keyhandler.parentalFromHomeKeyhandler(event);
                break;
            }
            case "showCastingDevicesPopUp": {
                Keyhandler.showCastingDevicesPopUpKeyhandler(event);
                break;
            }
            case "search":
            case "adult": {
                Keyhandler.adultKeyDown(event);
                break;
            }
            case "changePin": {
                Keyhandler.changePinKeyDown(event);
                break;
            }
            case "tvGuide": {
                Keyhandler.tvGuideKeyHandler(event);
                break;
            }
            case "deleteUser": {
                Keyhandler.deleteUserKeyhandler(event);
                break;
            }
        }
    }
}

function loginLink(listType) {
    selectedListBoxType = listType;
    Keyhandler.listUserEnter($(".imageFocus"));
}

function deleteLink(position, listType) {

    deleteBoxPosition = position;
    deleteBoxType = listType;
    $(".dropdown-content").removeClass("hide");
    $(".dropdown-content").removeClass("show");
    pushState(view, $(".imageFocus").attr("id"));
    $('.imageFocus').removeClass("imageFocus");
    view = "deleteUser";
    $("#genericDiv").html(Util.showPopUp(2, '', "Are you sure you want to delete this user?", "Yes", "No"));
    $("#genericDiv").show();
    $("#Btn-0").addClass("imageFocus");
}




function playLink() {

    var currFocus = $('.imageFocus');
    var v_index = parseInt(currFocus.attr("v_index"));
    var h_index = parseInt(currFocus.attr("h_index"));

    var index = parseInt(currFocus.attr("index"));
    var streamId = currFocus.attr("streamId");

    // var streamId = currFocus.attr("streamid");
    var id = currFocus.attr("id");
    var count = parseInt(currFocus.attr("count"));
    var source = currFocus.attr("source");

    hideAddToFav();

    //  if(streamId == undefined || Player.data == undefined || Player.data.stream_id == undefined || Player.data.stream_id != streamId){
    $(".playing").removeClass("playing");
    $(".imageFocus").addClass('playing');
    playingIndex = index;
    playingChannel = streamId;
    playerLiveIndex = index;
    Player.data = liveSectionDetails[index];


    //  console.log(playingChannel);



    //    playUrl = "file:///Users/harman/Documents/HITMANS_BODYGUARD_2017.mkv";
    if (currentAPPType == "m3u") {
        playUrl = Player.data.url;
    } else {

        Main.getEPG(streamId);
        if (Main.profile.server_info.server_protocol != "" && Main.profile.server_info.server_protocol == "https") {
            playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + Player.data.stream_id + selectedContainer;
            // playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + Player.data.stream_id;
        } else {
            playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + Player.data.stream_id + selectedContainer;
            // playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + Player.data.stream_id;
        }
    }



    Player.playStream(playUrl, true);
}

function addToFavLink(stream_id, i) {
    if (currentAPPType == "m3u") {
        if (stream_id != '') {
            var item = localStorage.getItem("allM3UFavourites");
            var obj = [];
            var hashtable = [];
            if (item !== null) {
                objOld = JSON.parse(item);
                hashtable = JSON.parse(item);

                for (var j = 0; j < objOld.length; j++) {
                    if (objOld[j][0] == Main.profile.m3uLine) {
                        obj = objOld[j][1];
                        if (jQuery.inArray(objOld[j][0], hashtable)) {
                            delete hashtable[j];
                            hashtable = $.grep(hashtable, function (n) { return n == 0 || n });
                        }
                        break;
                    }
                }
            }

            obj.push(stream_id);



            hashtable.push([Main.profile.m3uLine, obj]);
            localStorage.setItem("allM3UFavourites", JSON.stringify(hashtable));

            // console.log(hashtable);


            // jQuery("#add_to_fav_link_"+i).html("Remove From Favourite");
            // jQuery("#add_to_fav_link_"+i).removeClass("addToFavClass");
            // jQuery("#add_to_fav_link_"+i).addClass("RemoveFromFavClass");
            // jQuery("#add_to_fav_link_"+i).attr("onclick","removeFromFavLink("+stream_id+","+i+")");
            // jQuery("#add_to_fav_link_"+i).attr("id","remove_from_fav_link_"+i);
            jQuery("#remove_from_fav_link_" + i).show();
            jQuery("#add_to_fav_link_" + i).hide();
            jQuery("#favStar_" + i).removeClass("hide");
            jQuery("#favStar_" + i).addClass("show");
        }
    } else {
        if (stream_id != '') {

            // console.log("Aman:1");
            //       if(Main.multiDNS == true){
            var item = localStorage.getItem("allLiveFavourites");
            var obj = [];
            var hashtable = [];
            if (item !== null) {
                objOld = JSON.parse(item);
                hashtable = JSON.parse(item);

                for (var j = 0; j < objOld.length; j++) {
                    if (objOld[j][0] == Main.profile.user_info.login_url) {
                        obj = objOld[j][1];
                        if (jQuery.inArray(objOld[j][0], hashtable)) {
                            delete hashtable[j];
                            hashtable = $.grep(hashtable, function (n) { return n == 0 || n });
                        }
                        break;
                    }
                }
            }

            obj.push(stream_id);



            hashtable.push([Main.profile.user_info.login_url, obj]);
            localStorage.setItem("allLiveFavourites", JSON.stringify(hashtable));

            // console.log(hashtable);


            // jQuery("#add_to_fav_link_"+i).html("Remove From Favourite");
            // jQuery("#add_to_fav_link_"+i).removeClass("addToFavClass");
            // jQuery("#add_to_fav_link_"+i).addClass("RemoveFromFavClass");
            // jQuery("#add_to_fav_link_"+i).attr("onclick","removeFromFavLink("+stream_id+","+i+")");
            // jQuery("#add_to_fav_link_"+i).attr("id","remove_from_fav_link_"+i);

            jQuery("#remove_from_fav_link_" + i).show();
            jQuery("#add_to_fav_link_" + i).hide();

            jQuery("#favStar_" + i).removeClass("hide");
            jQuery("#favStar_" + i).addClass("show");

        }
    }

    hideAddToFav();
}

function removeFromFavLink(stream_id, i) {

    if (currentAPPType == "m3u") {
        if (stream_id != '') {

            var allLiveFavourites = JSON.parse(localStorage.getItem("allM3UFavourites"));

            if (allLiveFavourites !== null) {
                for (var j = 0; j < allLiveFavourites.length; j++) {
                    if (allLiveFavourites[j][0] == Main.profile.m3uLine) {
                        allLiveFavourites[j][1].splice(jQuery.inArray(stream_id, allLiveFavourites[j][1]), 1);

                    }
                }
            }
            // console.log(allLiveFavourites);
            localStorage.setItem("allM3UFavourites", JSON.stringify(allLiveFavourites));


            // jQuery("#remove_from_fav_link_"+i).html("Add to Favourite");
            // jQuery("#remove_from_fav_link_"+i).removeClass("RemoveFromFavClass");
            // jQuery("#remove_from_fav_link_"+i).addClass("addToFavClass");
            // jQuery("#remove_from_fav_link_"+i).attr("onclick","addToFavLink("+stream_id+","+i+")");
            // jQuery("#remove_from_fav_link_"+i).attr("id","add_to_fav_link_"+i);
            jQuery("#remove_from_fav_link_" + i).hide();
            jQuery("#add_to_fav_link_" + i).show();
            jQuery("#favStar_" + i).removeClass("show");
            jQuery("#favStar_" + i).addClass("hide");



        }
    } else {
        if (stream_id != '') {
            // console.log("HONEY:1");

            var allLiveFavourites = JSON.parse(localStorage.getItem("allLiveFavourites"));

            if (allLiveFavourites !== null) {
                for (var j = 0; j < allLiveFavourites.length; j++) {
                    if (allLiveFavourites[j][0] == Main.profile.user_info.login_url) {
                        allLiveFavourites[j][1].splice(jQuery.inArray(stream_id, allLiveFavourites[j][1]), 1);

                    }
                }
            }
            // console.log("HONEY:2");

            // console.log(allLiveFavourites);
            localStorage.setItem("allLiveFavourites", JSON.stringify(allLiveFavourites));


            // jQuery("#remove_from_fav_link_"+i).html("Add to Favourite");
            // jQuery("#remove_from_fav_link_"+i).removeClass("RemoveFromFavClass");
            // jQuery("#remove_from_fav_link_"+i).addClass("addToFavClass");
            // console.log("HONEY:3");

            // jQuery("#remove_from_fav_link_"+i).attr("onclick","addToFavLink("+stream_id+","+i+")");
            // jQuery("#remove_from_fav_link_"+i).attr("id","add_to_fav_link_"+i);

            jQuery("#remove_from_fav_link_" + i).hide();
            jQuery("#add_to_fav_link_" + i).show();
            jQuery("#favStar_" + i).removeClass("show");
            jQuery("#favStar_" + i).addClass("hide");
            // console.log("HONEY:4");




        }
    }

    hideAddToFav();
}


function addToFavMovie(stream_id) {
    if (stream_id != '') {

        var item = localStorage.getItem("allMoviesFavourites");
        var obj = [];
        var hashtable = [];
        if (item !== null) {
            objOld = JSON.parse(item);
            hashtable = JSON.parse(item);

            for (var j = 0; j < objOld.length; j++) {
                if (objOld[j][0] == Main.profile.user_info.login_url) {
                    obj = objOld[j][1];
                    if (jQuery.inArray(objOld[j][0], hashtable)) {
                        delete hashtable[j];
                        hashtable = $.grep(hashtable, function (n) { return n == 0 || n });
                    }
                    break;
                }
            }
        }

        obj.push(stream_id);



        hashtable.push([Main.profile.user_info.login_url, obj]);
        localStorage.setItem("allMoviesFavourites", JSON.stringify(hashtable));

        // console.log(hashtable);



        // jQuery("#addToFavMovie").html("Remove From Favourite");
        jQuery("#addToFavMovie").attr("onclick", "removeFromFavMovie(" + stream_id + ")");
        jQuery("#addToFavMovie").addClass("activefav");

        jQuery(".favDiv_" + stream_id).addClass("activefav");
        jQuery(".favDiv_" + stream_id).show();
        jQuery("#addToFavMovie").attr("id", "removeFromFavMovie");

        //        localStorage.setItem("favMoviesList",JSON.stringify(obj));


    }
}

function removeFromFavMovie(stream_id) {
    if (stream_id != '') {

        var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));

        if (allMoviesFavourites !== null) {
            for (var j = 0; j < allMoviesFavourites.length; j++) {
                if (allMoviesFavourites[j][0] == Main.profile.user_info.login_url) {
                    allMoviesFavourites[j][1].splice(jQuery.inArray(stream_id, allMoviesFavourites[j][1]), 1);

                }
            }
        }
        // console.log(allMoviesFavourites);
        localStorage.setItem("allMoviesFavourites", JSON.stringify(allMoviesFavourites));
        //        var item = localStorage.getItem("favMoviesList");
        //
        //        var obj = [];
        //        if(item !== null) {
        //            obj = JSON.parse(item);
        //        }
        //
        //        obj.splice(jQuery.inArray(stream_id, obj),1);

        // jQuery("#removeFromFavMovie").html("Add to Favourite");
        jQuery("#removeFromFavMovie").attr("onclick", "addToFavMovie(" + stream_id + ")");
        jQuery("#removeFromFavMovie").removeClass("activefav");
        jQuery(".favDiv_" + stream_id).removeClass("activefav");
        jQuery(".favDiv_" + stream_id).hide();
        jQuery("#removeFromFavMovie").attr("id", "addToFavMovie");

        //        localStorage.setItem("favMoviesList",JSON.stringify(obj));


    }
}



function addToFavSeries(stream_id) {
    if (stream_id != '') {
        var item = localStorage.getItem("allSeriesFavourites");
        var obj = [];
        var hashtable = [];
        if (item !== null) {
            objOld = JSON.parse(item);
            hashtable = JSON.parse(item);

            for (var j = 0; j < objOld.length; j++) {
                if (objOld[j][0] == Main.profile.user_info.login_url) {
                    obj = objOld[j][1];
                    if (jQuery.inArray(objOld[j][0], hashtable)) {
                        delete hashtable[j];
                        hashtable = $.grep(hashtable, function (n) { return n == 0 || n });
                    }
                    break;
                }
            }
        }

        obj.push(stream_id);



        hashtable.push([Main.profile.user_info.login_url, obj]);
        localStorage.setItem("allSeriesFavourites", JSON.stringify(hashtable));

        // console.log(hashtable);

        //        var item = localStorage.getItem("favSeriesList");
        //
        //        var obj = [];
        //        if(item !== null) {
        //            obj = JSON.parse(item);
        //        }
        //
        //        obj.push(stream_id);

        // jQuery("#addToFavSeries").html("Remove From Favourite");
        jQuery("#addToFavSeries").attr("onclick", "removeFromFavSeries(" + stream_id + ")");
        jQuery("#addToFavSeries").addClass("activefav");

        jQuery(".favDiv_" + stream_id).addClass("activefav");
        jQuery(".favDiv_" + stream_id).show();
        // jQuery("#favDiv_"+stream_id).append('<img src="images/favourite_yellow.png" style="position: absolute;width: 30px;z-index: 99999;margin-left: 10px;margin-top: 10px;"></div>');
        jQuery("#addToFavSeries").attr("id", "removeFromFavSeries");

        //        localStorage.setItem("favSeriesList",JSON.stringify(obj));


    }
}

function removeFromFavSeries(stream_id) {
    if (stream_id != '') {

        var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));

        if (allSeriesFavourites !== null) {
            for (var j = 0; j < allSeriesFavourites.length; j++) {
                if (allSeriesFavourites[j][0] == Main.profile.user_info.login_url) {
                    allSeriesFavourites[j][1].splice(jQuery.inArray(stream_id, allSeriesFavourites[j][1]), 1);

                }
            }
        }
        // console.log(allSeriesFavourites);
        localStorage.setItem("allSeriesFavourites", JSON.stringify(allSeriesFavourites));
        //        var item = localStorage.getItem("favSeriesList");
        //
        //        var obj = [];
        //        if(item !== null) {
        //            obj = JSON.parse(item);
        //        }
        //
        //        obj.splice(jQuery.inArray(stream_id, obj),1);

        // jQuery("#removeFromFavSeries").html("Add to Favourite");
        jQuery("#removeFromFavSeries").attr("onclick", "addToFavSeries(" + stream_id + ")");
        jQuery("#removeFromFavSeries").removeClass("activefav");
        jQuery(".favDiv_" + stream_id).removeClass("activefav");
        jQuery(".favDiv_" + stream_id).hide();
        jQuery("#removeFromFavSeries").attr("id", "addToFavSeries");

        //        localStorage.setItem("favSeriesList",JSON.stringify(obj));


    }
}


function hideAddToFav() {
    $('.dropdown-content').removeClass("hide");
    $('.dropdown-content').removeClass("showInlineGrid");
    AddToFavBoxHidden = true;
}
function viewFullEPG(stream_id, i) {
    Main.getFullEPG('get_simple_data_table', stream_id);

}

function pushState(view, focus, backData, startTime) {

    // console.log("pushState ");
    if (view == "leftMenu") view = contentView;
    for (var i = 0; i < stack.length; i++) {
        if (stack[i].view == view) {
            stack.splice(i, 1);
            i = 0;
        }
    }
    var obj = {
        "view": view,
        "focus": focus,
        "backData": backData,
        "time": startTime
    }
    stack.push(obj);
}
function popState(view, focus) {
    // console.log("popState");
    return stack.pop();
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}
Main.getAuth = function (url, user, pwd, name) {

    Main.ShowLoading();
    Main.login(url, user, pwd, name, "login");
    //     var m = 'gu',k = url,sc = '',av = '1.6.9',dt = 'unknown',dos = '8.1.0 O',d = 'Google Andriod SDK built for x86',Submit = "Submit";
    //     var r = getRandomArbitrary(10000,8388600);
    //     var sc = k + "*" + "NB!@#12ZKWd" + "-" + "" + "-" + r + "-" + av + "-" + dt + "-" + d + "-" + dos;
    //
    //     var dsc = MD5(sc);
    //      $.ajax({
    //		url : "http://smartapi.iptvsmarters.com/Android",
    //		type : "POST",
    //		data : {
    //			'm': m,
    //			'k': k,
    //			'sc': dsc,
    //			'r': r,
    //			'av': av,
    //			'dt': dt,
    //			'do': dos,
    //			'd': d
    //		},
    //		success : function (data) {
    //              // data = JSON.parse(data);
    //               if(data.status){
    //                    Main.login(url,user,pwd,name);
    //               }
    //               else{
    //                    Main.showFailure("Authorization Failed for this device.");
    //               }
    //		},
    //		error : function (errObj) {
    //			Main.showFailure("Failed to Authorize.");
    //		},
    //		timeout : 80000
    //	});

}

Main.login = function (port, email, pwd, name, loginType) {
    // alert(name);
    // Main.profile = JSON.parse(localStorage.getItem("profile"));

    localStorage.setItem("currentAPPType", "api");
    currentAPPType = localStorage.getItem("currentAPPType");
    Main.ShowLoading();
    $.ajax({
        url: port + "/player_api.php?username=" + email + "&password=" + pwd,
        type: "GET",
        data: {},
        success: function (data) {
            Main.HideLoading();
            //               var abc = JSON.stringify(data);
            //               alert(abc);
            //              var dataTesting=unescape(abc);
            //               alert(dataTesting);

            //var str='{\"user_info\":{\"username\":\"apidemo2\",\"password\":\"stenio\",\"message\":\"\",\"auth\":1,\"status\":\"Active\",\"exp_date\":\"1562813999\",\"is_trial\":\"0\",\"active_cons\":\"0\",\"created_at\":\"0\",\"max_connections\":\"1\",\"allowed_output_formats\":[\"m3u8\",\"ts\",\"rtmp\"]},\"server_info\":{\"url\":\"play.starbr.top\",\"port\":\"80\",\"https_port\":\"8080\",\"server_protocol\":\"http\",\"rtmp_port\":\"8001\",\"timezone\":\"America\\/Sao_Paulo\",\"timestamp_now\":1561970221,\"time_now\":\"2019-07-01 05:37:01\"}}"';
            //alert(str);
            // var str_esc=unescape(data);
            //var abc = JSON.stringify(str_esc);
            //alert(str_esc);

            //alert(jQuery.isPlainObject( data )) // false

            if (typeof data == "string") {
                data = JSON.parse(data);
            }

            //alert(data);






            //alert(abc);
            try {
                if (data.user_info.auth) {
                    if (data.user_info.status == "Active") {
                        data.user_info.name = name;
                        data.user_info.login_url = port;

                        var item = localStorage.getItem("listData");

                        var obj = [];
                        if (item !== null) {
                            obj = JSON.parse(item);
                        }


                        obj.push(data);
                        //                 alert(JSON.stringify(obj));
                        //                 alert(JSON.stringify(data));

                        if (loginType != "multiscreen") {
                            localStorage.setItem("listData", JSON.stringify(obj));
                        }

                        localStorage.setItem("profile", JSON.stringify(data));
                        //                 alert(JSON.stringify(obj));
                        //                 alert(data);

                        Main.profile = data;
                        //				alert(JSON.stringify(Main));
                        view = "homePage";
                        hideValues();
                        $("#mainContent").html(Util.gridHomePage());
                        $("#mainContent").show();
                    } else {
                        $(".dropdown-content").removeClass("hide");
                        $(".dropdown-content").removeClass("show");
                        if (loginType == "login") {
                            $("#login_error_msg").html("Your Status is " + data.user_info.status);
                            $("#login_error_msg").slideDown();
                            setTimeout(function () {
                                $("#login_error_msg").slideUp();
                            }, 2000);
                        } else {
                            Main.showFailure("Your Status is " + data.user_info.status);
                        }

                        $(".orange-button").focus();
                        callBack = '';
                    }

                } else {
                    if (loginType == "login") {
                        $("#login_error_msg").html("Invalid Username or Password!");
                        $("#login_error_msg").slideDown();
                        setTimeout(function () {
                            $("#login_error_msg").slideUp();
                        }, 3000);
                    } else {
                        Main.showFailure("Invalid Username or Password");
                    }

                    callBack = '';
                }
            }
            catch (e) {
                Main.showFailure(e);
                callBack = '';
            }

        },
        error: function (errObj) {
            Main.HideLoading();
            if (loginType == "login") {
                $("#login_error_msg").html("Invalid Details!");
                $("#login_error_msg").slideDown();
                setTimeout(function () {
                    $("#login_error_msg").slideUp();
                }, 3000);
            } else {
                Main.showFailure("Invalid Details!");
            }


            callBack = '';
        },
        timeout: 80000
    });
}

var sectionData = '';
var sectionDataCategoriesSearched = '';

Main.getSections = function (action, sectionType) {
    sectionData = [];
    Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action,
        type: "GET",
        data: {},
        success: function (data) {

            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            //               var temp = sectionData[0];
            //               sectionData = data;

            sectionData[0] = { category_id: "ALL", category_name: "ALL", parent_id: 0 };
            if (sectionType != "catchup" && sectionType != "multiscreen") {
                sectionData[1] = { category_id: "FAVOURITE", category_name: "FAVOURITE", parent_id: 0 };
            }


            sectionData = $.merge($.merge([], sectionData), data);

            var authFailed = false;
            try {
                if (data.user_info.auth) {
                    if (data.user_info.status == "Active") {

                    } else {
                        authFailed = true;
                        Main.showFailure("Your Status is " + data.user_info.status);
                    }
                } else {
                    authFailed = true;
                    Main.showFailure("Invalid Username or Password");
                }
            } catch (err) {

            }


            //               if(temp){
            //                    sectionData[Object.keys(sectionData).length] =  temp;
            //               }
            //   alert(JSON.stringify(sectionData));
            //               alert(JSON.stringify(data));
            //               alert(JSON.stringify(aaa));

            if (!authFailed) {
                sectionData.type = action;
                sectionData.sectionType = sectionType;
                pushState(view, $(".imageFocus").attr("id"));
                $(".imageFocus").removeClass("imageFocus");
                if (sectionType == "multiscreen") {
                    view = "multiscreenCategoriesSections"
                } else {
                    view = "sections"
                }
                Main.processNext();
                Main.HideLoading();
            }

        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}

var fullEPGData = '';
//var archiveArray ='';
Main.getFullEPG = function (action, stream_id) {
    var currFocus = $('.imageFocus');
    var index = parseInt(currFocus.attr("index"));
    var channelName = liveSectionDetails[index].name;
    var loadingImage = '<tr colspan="4"><img src="images/Spin.png"  class="imgLoader"></tr>';
    $('#genericDiv').css('background', '#000000e6');
    $("#genericDiv").show();

    $("#genericDiv").html(Util.fullEPGPopUp(loadingImage, channelName));
    hideAddToFav();
    fullEPGData = [];
    // var datesTabs = [];
    // var tabsHTML = '';
    // var tabsData = '';
    // var counts = {};
    var fullEPGArray = [];
    // archiveArray = [];


    // var datesTabsIndex = 0;
    //alert(Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action="+action+"&stream_id="+stream_id);
    //	Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&stream_id=" + stream_id,
        type: "GET",
        data: {},
        success: function (data) {

            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            $("#mainContent").hide();

            var index = 0;
            var enterInLoop = false;
            var tdText = '';
            for (var i = 0; i < data.epg_listings.length; i++) {
                if (data.epg_listings[i].now_playing || enterInLoop) {
                    enterInLoop = true;
                    // console.log(data.epg_listings[i].start);
                    tdText += '<tr tabindex="' + index + '">'
                    tdText += '<td style="width: 15%;">' + getTwoHours3(data.epg_listings[i].start) + '</td>'
                    tdText += '<td style="width: 15%;">' + getTwoHours3(data.epg_listings[i].end) + '</td>'
                    tdText += '<td style="width: 20%;">' + Main.b64DecodeUnicode(data.epg_listings[i].title) + '</td>'
                    tdText += '<td style="width: 50%;">' + Main.b64DecodeUnicode(data.epg_listings[i].description) + '</td>'
                    tdText += '</tr>';
                    index++;
                    //                            fullEPGData.push(data.epg_listings[i]);
                }
            }

            if (tdText != "") {
                $("#genericDiv").html(Util.fullEPGPopUp(tdText, channelName));
            } else {
                $("#genericDiv").html(Util.fullEPGPopUp('<tr style="    display: inline-table;height: 100%;width: 100%;"><td colspan="4"><center style="    margin-top: 10%;    font-size: 22px;    margin-bottom: 10%;">No EPG Found!</center></td></tr>', channelName));

            }

            if (fullEPGKeyboardOpened) {
                $("tr[tabindex='0']").focus();
                $("tr[tabindex='0']").addClass("imageFocus1");
                fullEPGKeyboardOpened = false;
            }

            //                 for(var j=0;j<archiveData.length;j++){
            //                    var startDateWithTime = archiveData[j].start;
            //                    var startDateSplit = startDateWithTime.split(" ");
            //
            //                     var key = startDateSplit[0];
            //                        if(!counts[key]) counts[key] = 0;
            //                        counts[key]++;
            //
            //                        if(!compareString(startDateSplit[0],datesTabs)){
            //                                  datesTabs.push(startDateSplit[0]);
            //                        }
            //
            //                 }

            //                   archiveArray = _.groupBy(testingArray, 'start_date');

            //                 console.log(JSON.stringify(fullEPGData));




            //                if(datesTabs.length> 0){
            //                    tabsHTML +='<ul id="navlist" role="tablist">';
            //                    for(var k=0;k<datesTabs.length;k++){
            //                             var newDate = moment(datesTabs[k]).format('DD MMM YYYY');
            //
            //
            //                        if(k == datesTabs.length-1){
            //
            //                            tabsHTML +='<li role="presentation" class="active">';
            //                            tabsHTML +='<a role="tab" class="tab" id="DataTab_'+(k+1)+'" aria-setsize="'+datesTabs.length+'" aria-posinset="'+(k+1)+'" tabindex="0" href="#" aria-controls="panel-'+(k+1)+'" aria-selected="true" date="'+datesTabs[k]+'">'+newDate+'</a>';
            //
            //                                 tabsData += '<div class="panel current" role="tabpanel" aria-labelledby="DataTab_'+(k+1)+'" tabindex="-1" id="panel-'+(k+1)+'">';
            //                                            var row = 0,count = parseInt(archiveArray[datesTabs[k]].length / 5);
            //                                            if((archiveArray[datesTabs[k]].length / 5) % 1 != 0){
            //                                                count = count+1;
            //                                            }
            //                                            for(var i=0;i<(count*5);){
            //                                                    if(i % 5 == 0 || i == 0 ){
            //                                                        if(i > 8)
            //                                                            tabsData += '<div id="panel-'+(k+1)+'-sectionIndexCatchUp-'+row+'" index='+row+' count = '+count+'  class="col-md-6" style="display:none">';
            //                                                        else
            //                                                            tabsData += '<div id="panel-'+(k+1)+'-sectionIndexCatchUp-'+row+'" index='+row+' count = '+count+'  class="col-md-6">';
            //
            //                                                        row ++;
            //                                                    }
            //                                                    if(i<archiveArray[datesTabs[k]].length){
            //                                                        if(i == 0){
            //                                                            if(i<archiveArray[datesTabs[k]].length){
            //                                                               tabsData += '<p role="catchupSection" class="catchUpPara imageFocus" id="panel-'+(k+1)+'-sections-catchup-'+i+'" count='+archiveArray[datesTabs[k]].length+' rowindex='+(row-1)+' rowcount='+(count-1)+' index = '+(i%5)+' starttime="'+archiveArray[datesTabs[k]][i].start+'" stoptime="'+archiveArray[datesTabs[k]][i].end+'" streamid='+stream_id+' programname="'+atob(archiveArray[datesTabs[k]][i].title)+'">';
            //                                                                if(atob(archiveArray[datesTabs[k]][i].title).length < 26 ){
            //                                                                   tabsData +='<span class="catchUpSpan1">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                                }else{
            //                                                                   tabsData +='<span class="catchUpSpan1 namescroll">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                                }
            //                                                               tabsData += '</p>';
            //                                                            }
            //                                                         }else{
            //
            //                                                               tabsData += '<p role="catchupSection" class="catchUpPara" id="panel-'+(k+1)+'-sections-catchup-'+i+'" count='+archiveArray[datesTabs[k]].length+' rowindex='+(row-1)+' rowcount='+(count-1)+' index = '+(i%5)+' starttime="'+archiveArray[datesTabs[k]][i].start+'" stoptime="'+archiveArray[datesTabs[k]][i].end+'" streamid='+stream_id+' programname="'+atob(archiveArray[datesTabs[k]][i].title)+'">';
            //                                                                if(atob(archiveArray[datesTabs[k]][i].title).length < 26 ){
            //                                                                   tabsData +='<span class="catchUpSpan1">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                                }else{
            //                                                                   tabsData +='<span class="catchUpSpan1 namescroll">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                                }
            //                                                               tabsData += '</p>';
            //
            //                                                         }
            //
            //                                                    }
            //
            //                                                    i++;
            //                                                    if(i % 5 == 0 && i != 0){
            //                                                         tabsData += '</div>';
            //                                                    }
            //
            //                                            }
            //                                 tabsData +='  </div>';
            //
            //                        }else{
            //
            //                                        tabsData += '<div aria-hidden="true" class="panel" role="tabpanel" aria-labelledby="DataTab_'+(k+1)+'" tabindex="-1" id="panel-'+(k+1)+'">';
            //    					                var row = 0,count = parseInt(archiveArray[datesTabs[k]].length / 5);
            //    					                if((archiveArray[datesTabs[k]].length / 5) % 1 != 0){
            //    					                    count = count+1;
            //    					                }
            //                                        for(var i=0;i<(count*5);){
            //                                                if(i % 5 == 0 || i == 0 ){
            //                                                    if(i > 8)
            //                                                        tabsData += '<div id="panel-'+(k+1)+'-sectionIndexCatchUp-'+row+'" index='+row+' count = '+count+'  class="col-md-6" style="display:none">';
            //                                                    else
            //                                                        tabsData += '<div id="panel-'+(k+1)+'-sectionIndexCatchUp-'+row+'" index='+row+' count = '+count+'  class="col-md-6">';
            //
            //                                                    row ++;
            //                                                }
            //                                                if(i<archiveArray[datesTabs[k]].length){
            //                                                   tabsData += '<p role="catchupSection" class="catchUpPara" id="panel-'+(k+1)+'-sections-catchup-'+i+'" count='+archiveArray[datesTabs[k]].length+' rowindex='+(row-1)+' rowcount='+(count-1)+' index = '+(i%5)+' starttime="'+archiveArray[datesTabs[k]][i].start+'" stoptime="'+archiveArray[datesTabs[k]][i].end+'" streamid='+stream_id+' programname="'+atob(archiveArray[datesTabs[k]][i].title)+'">';
            //                                                    if(atob(archiveArray[datesTabs[k]][i].title).length < 26 ){
            //                                                       tabsData +='<span class="catchUpSpan1">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                    }else{
            //                                                       tabsData +='<span class="catchUpSpan1 namescroll">'+atob(archiveArray[datesTabs[k]][i].title)+'</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">'+archiveArray[datesTabs[k]][i].startTime+' - '+archiveArray[datesTabs[k]][i].endTime+'</span></span>';
            //                                                    }
            //                                                   tabsData += '</p>';
            //                                                }
            //
            //                                                i++;
            //						                        if(i % 5 == 0 && i != 0){
            //                                                     tabsData += '</div>';
            //                                                }
            //
            //                                        }
            //                                    tabsData +='  </div>';
            //
            //                            tabsHTML +='<li role="presentation">';
            //                            tabsHTML +='<a role="tab"  class="tab" id="DataTab_'+(k+1)+'" aria-setsize="'+datesTabs.length+'" aria-posinset="'+(k+1)+'" tabindex="-1" href="#" aria-controls="panel-'+(k+1)+'" aria-selected="false" date="'+datesTabs[k]+'">'+newDate+'</a>';
            //
            //                        }
            //                        tabsHTML +='</li>';
            //                    }
            //
            //                    tabsHTML +='</ul>';
            //
            //                }

            //                Main.HideLoading();
            ////                alert(view);
            ////                alert($(".imageFocus").attr("id"));
            //                pushState(view,$(".imageFocus").attr("id"));
            //                $(".imageFocus").removeClass("imageFocus");
            //                view = "liveCatchupPrograms";
            //                $("#catchupPrograms").html(Util.listCatchUpProgramsPage(tabsHTML,tabsData));
            //                $("#catchupPrograms").show();


        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}




var archiveData = '';
var archiveArray = '';
Main.getTVArchive = function (action, stream_id) {
    archiveData = [];
    var datesTabs = [];
    var tabsHTML = '';
    var tabsData = '';
    var counts = {};
    var testingArray = [];
    archiveArray = [];


    // var datesTabsIndex = 0;
    //alert(Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action="+action+"&stream_id="+stream_id);
    Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&stream_id=" + stream_id,
        type: "GET",
        data: {},
        success: function (data) {

            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            var index = 0;
            for (var i = 0; i < data.epg_listings.length; i++) {
                if (data.epg_listings[i].has_archive) {
                    var startDateWithTime = data.epg_listings[i].start;
                    var endDateWithTime = data.epg_listings[i].end;
                    var startDateSplit = startDateWithTime.split(" ");
                    var endDateSplit = endDateWithTime.split(" ");
                    var key = startDateSplit[0];
                    var startTime = startDateSplit[1];
                    var endTime = endDateSplit[1];

                    testingArray[index] = {
                        id: data.epg_listings[i].id,
                        epg_id: data.epg_listings[i].epg_id,
                        title: data.epg_listings[i].title,
                        lang: data.epg_listings[i].lang,
                        start: data.epg_listings[i].start,
                        start_date: key,
                        startTime: startTime,
                        endTime: endTime,
                        end: data.epg_listings[i].end,
                        description: data.epg_listings[i].description,
                        channel_id: data.epg_listings[i].channel_id,
                        start_timestamp: data.epg_listings[i].start_timestamp,
                        stop_timestamp: data.epg_listings[i].stop_timestamp,
                        now_playing: data.epg_listings[i].now_playing,
                        has_archive: data.epg_listings[i].has_archive
                    };
                    index++;
                    archiveData.push(data.epg_listings[i]);
                }
            }
            for (var j = 0; j < archiveData.length; j++) {
                var startDateWithTime = archiveData[j].start;
                var startDateSplit = startDateWithTime.split(" ");

                var key = startDateSplit[0];
                if (!counts[key]) counts[key] = 0;
                counts[key]++;

                if (!compareString(startDateSplit[0], datesTabs)) {
                    datesTabs.push(startDateSplit[0]);
                }

            }

            //  console.log(JSON.stringify(testingArray));

            //                                                alert(JSON.stringify(testingArray));

            archiveArray = _.groupBy(testingArray, 'start_date');
            //                                                alert(JSON.stringify(archiveArray));

            //  console.log(JSON.stringify(archiveArray));




            if (datesTabs.length > 0) {
                tabsHTML += '<ul id="navlist" role="tablist">';
                for (var k = 0; k < datesTabs.length; k++) {
                    var newDate = moment(datesTabs[k]).format('DD MMM YYYY');


                    if (k == datesTabs.length - 1) {

                        tabsHTML += '<li role="presentation" class="active">';
                        tabsHTML += '<a role="tab" class="tab" id="DataTab_' + (k + 1) + '" aria-setsize="' + datesTabs.length + '" aria-posinset="' + (k + 1) + '" tabindex="0" href="#" aria-controls="panel-' + (k + 1) + '" aria-selected="true" date="' + datesTabs[k] + '">' + newDate + '</a>';

                        tabsData += '<div class="panel current scrollBarClass" role="tabpanel" aria-labelledby="DataTab_' + (k + 1) + '" tabindex="-1" id="panel-' + (k + 1) + '">';
                        var row = 0, count = parseInt(archiveArray[datesTabs[k]].length);

                        for (var i = 0; i < count; i++) {

                            if (i == 0) {

                                tabsData += '<div class="col-sm-6 categoriesSection">'
                                tabsData += '<p role="catchupSection" class="catchUpPara imageFocus" id="panel-' + (k + 1) + '-sections-catchup-' + i + '" count=' + archiveArray[datesTabs[k]].length + ' rowindex=' + (row - 1) + ' rowcount=' + (count - 1) + ' index = ' + (i % 5) + ' starttime="' + archiveArray[datesTabs[k]][i].start + '" stoptime="' + archiveArray[datesTabs[k]][i].end + '" streamid=' + stream_id + ' programname="' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '">';
                                tabsData += '<span class="catchUpSpan1">' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">' + getCatchUPDate(archiveArray[datesTabs[k]][i].startTime) + ' - ' + getCatchUPDate(archiveArray[datesTabs[k]][i].endTime) + '</span></span>';

                                tabsData += '</p>';
                                tabsData += '</div>';


                            } else {

                                tabsData += '<div class="col-sm-6 categoriesSection">'

                                tabsData += '<p role="catchupSection" class="catchUpPara" id="panel-' + (k + 1) + '-sections-catchup-' + i + '" count=' + archiveArray[datesTabs[k]].length + '  rowcount=' + (count - 1) + '  starttime="' + archiveArray[datesTabs[k]][i].start + '" stoptime="' + archiveArray[datesTabs[k]][i].end + '" streamid=' + stream_id + ' programname="' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '">';

                                tabsData += '<span class="catchUpSpan1">' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">' + getCatchUPDate(archiveArray[datesTabs[k]][i].startTime) + ' - ' + getCatchUPDate(archiveArray[datesTabs[k]][i].endTime) + '</span></span>';

                                tabsData += '</p>';
                                tabsData += '</div>';

                            }



                        }
                        tabsData += '  </div>';

                    } else {

                        tabsData += '<div aria-hidden="true" class="panel scrollBarClass" role="tabpanel" aria-labelledby="DataTab_' + (k + 1) + '" tabindex="-1" id="panel-' + (k + 1) + '">';
                        var row = 0, count = parseInt(archiveArray[datesTabs[k]].length);
                        for (var i = 0; i < count; i++) {
                            tabsData += '<div class="col-sm-6 categoriesSection">'
                            tabsData += '<p role="catchupSection" class="catchUpPara" id="panel-' + (k + 1) + '-sections-catchup-' + i + '" count=' + archiveArray[datesTabs[k]].length + '  rowcount=' + (count - 1) + '  starttime="' + archiveArray[datesTabs[k]][i].start + '" stoptime="' + archiveArray[datesTabs[k]][i].end + '" streamid=' + stream_id + ' programname="' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '">';
                            tabsData += '<span class="catchUpSpan1">' + Main.b64DecodeUnicode(archiveArray[datesTabs[k]][i].title) + '</span><br><span class="catchUpSpan3"><img src="images/tv_arch.png" class="catchupImage"><span class="catchUpSpan2">' + getCatchUPDate(archiveArray[datesTabs[k]][i].startTime) + ' - ' + getCatchUPDate(archiveArray[datesTabs[k]][i].endTime) + '</span></span>';
                            tabsData += '</p>';
                            tabsData += '</div>';

                        }
                        tabsData += '  </div>';

                        tabsHTML += '<li role="presentation">';
                        tabsHTML += '<a role="tab"  class="tab" id="DataTab_' + (k + 1) + '" aria-setsize="' + datesTabs.length + '" aria-posinset="' + (k + 1) + '" tabindex="-1" href="#" aria-controls="panel-' + (k + 1) + '" aria-selected="false" date="' + datesTabs[k] + '">' + newDate + '</a>';

                    }
                    tabsHTML += '</li>';
                }

                tabsHTML += '</ul>';

            } else {
                // alert("No Archive Found!");
            }



            Main.HideLoading();
            //                alert(view);
            //                alert($(".imageFocus").attr("id"));
            pushState(view, $(".imageFocus").attr("id"));
            $(".imageFocus").removeClass("imageFocus");

            $("#catchupChannels").hide();
            view = "liveCatchupPrograms";
            $("#catchupPrograms").html(Util.listCatchUpProgramsPage(tabsHTML, tabsData));
            $("#catchupPrograms").show();

        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}



// Main.getTVArchive = function(action,stream_id){
// 	var Text = ''; 




// Text +='<div class="blueBackgroundCenter">'
// Text +='<div class="container">'
// Text +='        <div class="row">'
// Text +='            <div class="col-sm-12" style="padding: 30px;margin-top: 50px;"> '
// Text +='                <div class="row">'


// Text +='                    <div class="col-md-4">'
// Text +='                        <img src="images/home-logo.png" style="width: 200px;">'
// Text +='                      </div>'
// Text +='                      <div class="col-md-4" style="display: flex;">'
// Text +='                        <span style="color: white;margin: auto;font-size: 28px;">CATCH UP CHANNELS</span>'
// Text +='                      </div>'
// Text +='                     <div class="col-md-4">'

// Text +='                      </div>'

// Text +='                </div>'
// Text +='            </div>'

// Text +='            <div class="col-sm-12" style="height: 100%;    overflow: auto;"> '
// Text +='              <div class="row">'


// for(var i=0;i<section.length;i++){
//           Text +='  <div class="col-sm-6 categoriesSection"><div class="section" id="sectionCatchup-'+i+'"  categ="'+section[i].category_id+'"  stream_id="'+section[i].stream_id+'"  count='+section.length+'  ><div class="floatLeft"><img src="'+section[i].stream_icon+'" style="width:86px;height:62px" onerror="this.src=\'images/logo.png\';" ><p><span>'+section[i].name+'</span></p></div></div></div> ' 
// }

// Text +='           </div>'

// Text +='          </div>'
// Text +='    </div>'
// Text +='    </div>';


// 	return Text;
// }


var singleMovie = '', singleMovieRelatedData = '', singleCast = '';
Main.getSingleMovie = function (id) {
    //alert(id);
    //alert(vodSectionDetails.length);
    var cID = "";
    var cName = "";
    var flag = false;
    openedMovieID = id;


    Main.ShowLoading();
    if (parentPin) {
        for (var i = 0; i < vodSectionDetails.length; i++) {
            if (vodSectionDetails[i].stream_id == id) {
                cID = vodSectionDetails[i].category_id;
                break;
            }
        }
        if (cID != "") {
            for (var j = 0; j < sectionData.length; j++) {
                if (sectionData[j].category_id == cID) {
                    cName = sectionData[j].category_name;
                    break;
                }

            }
        }

        //    alert(cName);
        if (cName != "" && parentPin) {
            if (compareString(cName, adultArray)) {
                flag = true;
                //            alert("locked movie");
                Main.HideLoading();

                pushState(view, $(".imageFocus").attr("id"));
                $(".imageFocus").removeClass("imageFocus");
                view = "enterPinMovies";
                $("#customMessage").html(Util.confirmPin());
                $("#customMessage").show();

            }

        }
    }
    if (!flag) {
        $.ajax({
            url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=get_vod_info&vod_id=" + id,
            type: "GET",
            data: {},
            success: function (data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }
                Main.HideLoading();
                hideValues();
                singleMovie = data;
                //                singleMovie.movie_data.name =
                //                singleMovie.movie_data.stream_id = openedMovieID
                if (view != "singleMovie")
                    pushState(view, $(".imageFocus").attr("id"));
                $(".imageFocus").removeClass("imageFocus");
                view = "singleMovie";
                Main.processNext();
            },
            error: function (errObj) {
                Main.HideLoading();
                Main.showFailure("Something went wrong. Please try again.");
            },
            timeout: 80000
        });

    }
}

// For TV show and Movies listing pages
Main.getVodDetails = function (action, category) {
    //alert(category);

    Main.ShowLoading();
    if (category == "FAVOURITE") {
        if (action == "get_series") {
            //	    	 var items = JSON.parse(localStorage.getItem('favSeriesList'));
            var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
            //  console.log(allSeriesFavourites);

            if (allSeriesFavourites !== null) {
                for (var j = 0; j < allSeriesFavourites.length; j++) {
                    if (allSeriesFavourites[j][0] == Main.profile.user_info.login_url) {
                        var items = allSeriesFavourites[j][1];
                    }
                }
            }
        } else {
            var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
            // console.log(allMoviesFavourites);

            if (allMoviesFavourites !== null) {
                for (var j = 0; j < allMoviesFavourites.length; j++) {
                    if (allMoviesFavourites[j][0] == Main.profile.user_info.login_url) {
                        var items = allMoviesFavourites[j][1];
                    }
                }
            }
            //	    	 var items = JSON.parse(localStorage.getItem('favMoviesList'));
        }
        if (items !== null && items !== undefined && items.length > 0) {

            ajaxGetVODDetails(action, category, "fav", items);
        } else {
            Main.HideLoading();
            Main.showFailure("No Favourite Found.");
        }

    } else {
        ajaxGetVODDetails(action, category, "", "");
    }


}

function ajaxGetVODDetails(action, category, catType, items) {
    // console.log(action);
    // console.log(category);
    // console.log(catType);
    // console.log(items);
    Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&category_id=" + category,
        type: "GET",
        data: {},
        success: function (data) {
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            //         alert(Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action="+action+"&category_id="+category);

            Main.HideLoading();
            if (catType == "fav") {
                var obj = [];
                if (action == "get_series") {
                    for (var i = 0; i < data.length; i++) {

                        if (items != null && jQuery.inArray(data[i].series_id, items) != -1) {
                            obj.push(data[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        //                                 alert(JSON.stringify(data[i]));

                        if (items != null && jQuery.inArray(data[i].stream_id, items) != -1) {
                            obj.push(data[i]);
                        }
                    }
                }
                loadMoviesPageData(obj, action);




            } else {

                loadMoviesPageData(data, action);
            }

        },
        error: function (errObj) {
            //               Main.showFailure(errObj.responseText);
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });

}



function ajaxGetCatDetails(action, category, items, categ) {
    Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&category_id=" + category,
        type: "GET",
        data: {},
        success: function (data) {
            if (typeof data == "string") {
                data = JSON.parse(data);
            }

            var found = false;
            //   alert(items);
            // console.log(JSON.stringify(data));


            Main.HideLoading();

            //                        var obj = [];
            if (action == "get_series") {
                for (var i = 0; i < data.length; i++) {

                    if (items != null && jQuery.inArray(data[i].series_id, items) != -1) {
                        //                                       obj.push(data[i]);
                        found = true;
                        Main.HideLoading();
                        openedMovieCatID = categ;
                        openedSectionAction = action;
                        pushState(view, $(".imageFocus").attr("id"));
                        $(".imageFocus").removeClass("imageFocus");
                        view = "enterPinMoviesCategories";
                        $("#customMessage").html(Util.confirmPin());
                        $("#customMessage").show();
                        break;
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    //                                 alert(JSON.stringify(data[i]));

                    if (items != null && jQuery.inArray(data[i].stream_id, items) != -1) {
                        //                                       obj.push(data[i]);
                        found = true;
                        Main.HideLoading();
                        openedMovieCatID = categ;
                        openedSectionAction = action;
                        pushState(view, $(".imageFocus").attr("id"));
                        $(".imageFocus").removeClass("imageFocus");
                        view = "enterPinMoviesCategories";
                        $("#customMessage").html(Util.confirmPin());
                        $("#customMessage").show();
                        break;
                    }
                }



            }

            if (!found) {
                Main.getVodDetails(action, categ);
            }





        },
        error: function (errObj) {
            //               Main.showFailure(errObj.responseText);
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });

}


var movieSectionDefaultWithoutSorting = [];
var movieSectionDefaultWithoutSortingCategories = [];

function loadMoviesPageData(data, action) {
    if (typeof (sectionDataCategoriesSearched) == 'undefined') {
        var selectedCat = sectionData[sectionsIndex];
    } else {
        if ($(".clearSearchCategories").is(":visible")) {
            var selectedCat = sectionDataCategoriesSearched[sectionsIndex];
        } else {
            var selectedCat = sectionData[sectionsIndex];
        }
    }

    vodSectionDetails = data;
    vodSectionDetailsFullData = data;
    if (data.length) {
        // console.log("honey3");
        // console.log(vodSectionDetails);
        vodSectionDetails.category = selectedCat;

        // console.log("testing:"+sectionsIndex);
        // console.log(vodSectionDetails.category);
        // console.log(sectionData);

        movieSectionDefaultWithoutSorting = '';
        movieSectionDefaultWithoutSortingCategories = '';

        movieSectionDefaultWithoutSortingCategories = JSON.stringify(vodSectionDetails.category);
        movieSectionDefaultWithoutSorting = JSON.stringify(vodSectionDetails);


        hideValues();
        pushState(view, $('.imageFocus').attr('id'));
        if (action == "get_vod_streams") {
            pageType = "movies";
        } else {
            pageType = "series";
        }
        view = "vodMovies";
        $("#mainContent").html('');
        $(".imageFocus").removeClass("imageFocus");
        $("#mainContent").html(Util.vodMoviesPage(vodSectionDetails));
        $("#vodMovies-0-0").addClass('imageFocus');
        $("#mainContent").show();
    } else {
        if (action == "get_vod_streams")
            Main.showFailure("No Movies Found.");
        else
            Main.showFailure("No Series Found.");
    }
}

var seriesPage = '';
Main.getSeriesPage = function (id) {
    var cID = "";
    var cName = "";
    var flag = false;
    openedSeriesID = id;

    Main.ShowLoading();

    if (parentPin) {
        for (var i = 0; i < vodSectionDetails.length; i++) {
            if (vodSectionDetails[i].series_id == id) {
                cID = vodSectionDetails[i].category_id;
                break;
            }
        }
        if (cID != "") {
            for (var j = 0; j < sectionData.length; j++) {
                if (sectionData[j].category_id == cID) {
                    cName = sectionData[j].category_name;
                    break;
                }

            }
        }

        //    alert(cName);
        if (cName != "" && parentPin) {
            if (compareString(cName, adultArray)) {
                flag = true;
                //            alert("locked movie");
                Main.HideLoading();

                pushState(view, $(".imageFocus").attr("id"));
                $(".imageFocus").removeClass("imageFocus");
                view = "enterPinSeries";
                $("#customMessage").html(Util.confirmPin());
                $("#customMessage").show();

            }

        }
    }

    if (!flag) {
        $.ajax({
            url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=get_series_info" + "&series_id=" + id,
            type: "GET",
            data: {},
            success: function (data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }
                Main.HideLoading();
                hideValues();
                seriesPage = data;
                if (view != "tvshowDetails")
                    pushState(view, $(".imageFocus").attr("id"));
                $(".imageFocus").removeClass("imageFocus");

                view = "tvshowDetails";
                Main.processNext();

            },
            error: function (errObj) {
                Main.HideLoading();
                Main.showFailure("Something went wrong. Please try again.");
            },
            timeout: 80000
        });
    }
}
var playingIndex = 0;
var playingChannel = "";
Main.getLiveDetails = function (action, category, part, sectionType) {
    // alert(sectionType);
    //alert(category);
    //alert(part);
    Main.ShowLoading();
    if (sectionType == "live" || sectionType == "multiscreen") {
        if (category == "FAVOURITE") {
            var allLiveFavourites = JSON.parse(localStorage.getItem("allLiveFavourites"));
            if (allLiveFavourites !== null) {
                for (var j = 0; j < allLiveFavourites.length; j++) {
                    if (allLiveFavourites[j][0] == Main.profile.user_info.login_url) {
                        var items = allLiveFavourites[j][1];
                    }
                }
            }

            //            var items = JSON.parse(localStorage.getItem('favChannelsList'));
            if (items !== null && items !== undefined && items.length > 0) {

                ajaxGetLiveDetails(action, category, part, "fav", items);
            } else {

                Main.HideLoading();
                var obj = [];
                loadLivePageData(obj, part);
            }

        } else {

            if (sectionType == "live") {
                ajaxGetLiveDetails(action, category, part, "", "");

            } else if (sectionType == "multiscreen") {
                ajaxGetMultiScreenLiveDetails(action, category, part, "", "");
            }

        }
    } else if (sectionType == "catchup") {
        ajaxGetCatchUpDetails(action, category, part, "", "");
    }


}
var catchUpChannelsData = '';

function ajaxGetMultiScreenLiveDetails(action, category, part, catType, items) {
    // catchUpChannelsData = [];

    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&category_id=" + category,
        type: "GET",
        data: {},
        success: function (data) {
            Main.HideLoading();
            if (typeof data == "string") {
                data = JSON.parse(data);
            }



            //     for(var i=0;i<data.length;i++){
            //         if(data[i].tv_archive) {
            //            catchUpChannelsData.push(data[i]);
            //         }
            //    }

            //       			        alert(catchUpChannelsData.length);
            if (data.length > 0) {
                hideValues();
                pushState(view, $('.imageFocus').attr('id'));
                view = "liveMultiScreenChannels";
                // $("#catchupChannels").html('');
                $(".imageFocus").removeClass("imageFocus");
                $("#multiscreenCategoriesSections").hide();
                $("#multiscreenLiveSections").html(Util.listMultiScreenChannelsPage(data));

                var mainArray = [];

                for (var i = 0; i < data.length; i++) {
                    var tempArray = [];

                    box = {
                        added: data[i].added,
                        category_id: data[i].category_id,
                        custom_sid: data[i].custom_sid,
                        direct_source: data[i].direct_source,
                        epg_channel_id: data[i].epg_channel_id,
                        name: data[i].name,
                        num: data[i].num,
                        stream_icon: data[i].stream_icon,
                        stream_id: data[i].stream_id,
                        stream_type: data[i].stream_type,
                        tv_archive: data[i].tv_archive,
                        tv_archive_duration: data[i].tv_archive_duration,
                        index_number: i,

                    }
                    tempArray.push(box);

                    if ((i + 1) < data.length) {
                        i++;
                        box = {
                            added: data[i].added,
                            category_id: data[i].category_id,
                            custom_sid: data[i].custom_sid,
                            direct_source: data[i].direct_source,
                            epg_channel_id: data[i].epg_channel_id,
                            name: data[i].name,
                            num: data[i].num,
                            stream_icon: data[i].stream_icon,
                            stream_id: data[i].stream_id,
                            stream_type: data[i].stream_type,
                            tv_archive: data[i].tv_archive,
                            tv_archive_duration: data[i].tv_archive_duration,
                            index_number: i,

                        }
                        tempArray.push(box);
                    }

                    mainArray.push(tempArray);

                }


                mainArray.size = data.length;

                //  mainArray.type = data.type;
                //  mainArray.sectionType = data.sectionType;


                //  console.log(data);
                //  console.log(mainArray);

                // console.log("Array Size: "+mainArray.length);
                // console.log("Array: "+mainArray[0][0].category_id);
                multiscreenChannelsSection(mainArray);


                $("#multiscreenLiveSections").show();
                $("#profile").show();
            }

        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}


function ajaxGetCatchUpDetails(action, category, part, catType, items) {
    catchUpChannelsData = [];

    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&category_id=" + category,
        type: "GET",
        data: {},
        success: function (data) {
            Main.HideLoading();
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            //                 catchUpChannelsData = data;
            //                    alert(data.length);


            for (var i = 0; i < data.length; i++) {
                if (data[i].tv_archive) {
                    catchUpChannelsData.push(data[i]);
                }
            }

            //       			        alert(catchUpChannelsData.length);
            if (catchUpChannelsData.length > 0) {
                hideValues();
                pushState(view, $('.imageFocus').attr('id'));
                view = "liveCatchupChannels";
                $("#catchupChannels").html('');
                $(".imageFocus").removeClass("imageFocus");
                $("#catchupChannels").html(Util.listCatchUpChannelsPage(catchUpChannelsData));

                var mainArray = [];

                for (var i = 0; i < catchUpChannelsData.length; i++) {
                    var tempArray = [];

                    box = {
                        category_id: catchUpChannelsData[i].category_id,
                        epgChannelId: catchUpChannelsData[i].epgChannelId,
                        name: catchUpChannelsData[i].name,
                        num: catchUpChannelsData[i].num,
                        stream_icon: catchUpChannelsData[i].stream_icon,
                        stream_id: catchUpChannelsData[i].stream_id,
                        index_number: i

                    }
                    tempArray.push(box);

                    if ((i + 1) < catchUpChannelsData.length) {
                        i++;
                        box = {
                            category_id: catchUpChannelsData[i].category_id,
                            epgChannelId: catchUpChannelsData[i].epgChannelId,
                            name: catchUpChannelsData[i].name,
                            num: catchUpChannelsData[i].num,
                            stream_icon: catchUpChannelsData[i].stream_icon,
                            stream_id: catchUpChannelsData[i].stream_id,
                            index_number: i

                        }
                        tempArray.push(box);
                    }

                    mainArray.push(tempArray);

                }


                mainArray.size = catchUpChannelsData.length;

                //  console.log(data);
                //  console.log(mainArray); 
                catchupChannelsSection(mainArray);

                $("#catchupChannels").show();
            } else {
                if (view != "popUp")
                    pushState(view, $(".imageFocus").attr("id"));
                view = "popUp";
                $("#customMessage").show();
                $("#customMessage").html(Util.showStatusPopUp(0, "No CatchUp Found!", "OK"));
            }


            //                 alert("catchup show krne");
            //       			      if(catType =="fav"){
            //       			        var obj = [];
            //       			        for(var i=0;i<data.length;i++){
            //       			             if(items!=null && jQuery.inArray(data[i].stream_id, items) != -1) {
            //                                   obj.push(data[i]);
            //       			             }
            //       			        }
            ////       			         alert(JSON.stringify(obj));
            //
            //
            //       			      }else{
            //       			      }


        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}



function ajaxGetLiveDetails(action, category, part, catType, items) {
    // console.log(action);
    // console.log(category);
    // console.log(part);
    // console.log(catType);
    // console.log(items);
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=" + action + "&category_id=" + category,
        type: "GET",
        data: {},
        success: function (data) {
            Main.HideLoading();
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            if (catType == "fav") {
                var obj = [];
                for (var i = 0; i < data.length; i++) {
                    if (items != null && jQuery.inArray(data[i].stream_id, items) != -1) {
                        obj.push(data[i]);
                    }
                }
                loadLivePageData(obj, part);


            } else {
                loadLivePageData(data, part);
            }


        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}

//var liveSectionDefaultWithoutSortingArray = new Array();
var liveSectionDefaultWithoutSorting = [];
var liveSectionDefaultWithoutSortingCategories = [];
function loadLivePageData(data, part, sectionType) {
    //                alert("ABC");

    // console.log(data);
    // console.log("--"+part);

    // if(category == "FAVOURITE"){
    //     var allLiveFavourites = JSON.parse(localStorage.getItem("allLiveFavourites"));
    //      if(allLiveFavourites !== null) {
    //        for(var j=0;j<allLiveFavourites.length;j++){
    //               if(allLiveFavourites[j][0] == Main.profile.user_info.login_url){
    //                   var items =  allLiveFavourites[j][1];
    //               }
    //        }
    //      }

    //    if(items !== null && items !== undefined && items.length>0){

    //         ajaxGetLiveDetails(action,category,part,"fav",items);
    //    }else{

    //         Main.HideLoading();
    //         var obj = [];
    //         loadLivePageData(obj,part);
    //    }

    // }

    // alert("abc: "+sectionType);

    if (currentAPPType == "m3u" && sectionType == "multiscreen") {
        // console.log(data);

        if (data.length > 0) {
            hideValues();
            pushState(view, $('.imageFocus').attr('id'));
            view = "liveMultiScreenChannels";
            $(".imageFocus").removeClass("imageFocus");
            $("#multiscreenCategoriesSections").hide();
            $("#multiscreenLiveSections").html(Util.listMultiScreenChannelsPage(data));

            var mainArray = [];

            for (var i = 0; i < data.length; i++) {
                var tempArray = [];

                box = {
                    category_id: data[i].category_id,
                    epgChannelId: data[i].epgChannelId,
                    name: data[i].name,
                    num: data[i].num,
                    stream_icon: data[i].stream_icon,
                    stream_id: data[i].url,
                    index_number: i

                }
                tempArray.push(box);

                if ((i + 1) < data.length) {
                    i++;
                    box = {
                        category_id: data[i].category_id,
                        epgChannelId: data[i].epgChannelId,
                        name: data[i].name,
                        num: data[i].num,
                        stream_icon: data[i].stream_icon,
                        stream_id: data[i].url,
                        index_number: i

                    }
                    tempArray.push(box);
                }

                mainArray.push(tempArray);

            }


            mainArray.size = data.length;

            //  console.log(data);
            //  console.log(mainArray); 
            multiscreenChannelsSection(mainArray);


            $("#multiscreenLiveSections").show();
            $("#profile").show();
            // }

        }



        // ajaxGetMultiScreenLiveDetails(action,category,part,"","");
        return;
    }


    if (currentAPPType == "m3u") {
        Main.ShowLoading();
    }
    pageType = "live";



    if (data.length > 0) {

        if (typeof (sectionDataCategoriesSearched) == 'undefined') {
            var selectedCat = sectionData[sectionsIndex];
        } else {
            if ($(".clearSearchCategories").is(":visible")) {
                var selectedCat = sectionDataCategoriesSearched[sectionsIndex];
            } else {
                var selectedCat = sectionData[sectionsIndex];
            }
        }



        liveSectionDetails = data;
        liveSectionDetailsFullData = data;
        liveSectionDetailsFullData.category = sectionData[sectionsIndex];
        liveSectionDetails.category = selectedCat;


        liveSectionDefaultWithoutSorting = '';
        liveSectionDefaultWithoutSortingCategories = '';

        liveSectionDefaultWithoutSortingCategories = JSON.stringify(liveSectionDetails.category);
        liveSectionDefaultWithoutSorting = JSON.stringify(liveSectionDetails);

        if (part) {

            // alert("a");
            // alert("a:"+view);
            $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));

            Main.fetchAccToSortingLive();

            loadLiveData(liveSectionDetails);


            if (currentAPPType == "m3u") {
                Main.HideLoading();
            }
        } else {
            hideValues();
            //  alert("b:"+view);

            if (view == "sections") {
                pushState(view, $('.imageFocus').attr('id'));
            }
            view = "liveChannels";
            $("#mainContent").html('');
            $(".imageFocus").removeClass("imageFocus");

            $("#mainContent").html(Util.liveDetailsPage());



            Main.fetchAccToSortingLive();
            //  console.log(items);

            loadLiveData(liveSectionDetails);

            $("#liveChannel-0").addClass('imageFocus');
            $("#mainContent").show();
            $("#liveChannel-0").addClass('playing');
            playingIndex = 0;
            Player.data = liveSectionDetails[0];

            if (currentAPPType != "m3u") {
                Main.getEPG(liveSectionDetails[0].stream_id);
            }
            Player.type = "live";
            playerLiveIndex = 0;
            playUrl = '';

            if (currentAPPType == "m3u") {
                playingChannel = liveSectionDetails[0].url;
                playUrl = liveSectionDetails[0].url;
            } else {
                playingChannel = liveSectionDetails[0].stream_id;
                if (Main.profile.server_info.server_protocol != "" && Main.profile.server_info.server_protocol == "https") {
                    playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[0].stream_id + selectedContainer;
                } else {
                    playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[0].stream_id + selectedContainer;
                }
            }






            setTimeout(function () {
                Player.playStream(playUrl, true);
            }, 200);
            if (currentAPPType == "m3u") {
                Main.HideLoading();
            }






        }
        jQuery(".norecordfound").hide();


    } else {
        liveSectionDetails = data;
        liveSectionDetails.category = sectionData[sectionsIndex];
        liveSectionDetailsFullData = data;
        liveSectionDetailsFullData.category = sectionData[sectionsIndex];

        liveSectionDefaultWithoutSorting = '';
        liveSectionDefaultWithoutSortingCategories = '';

        liveSectionDefaultWithoutSortingCategories = JSON.stringify(liveSectionDetails.category);
        liveSectionDefaultWithoutSorting = JSON.stringify(liveSectionDetails);

        if (part) {

            // alert("b");
            $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));

            Main.fetchAccToSortingLive();

            loadLiveData(liveSectionDetails);

            jQuery(".norecordfound").show();
            if (currentAPPType == "m3u") {
                Main.HideLoading();
            }

        } else {
            hideValues();
            if (view == "sections") {
                pushState(view, $('.imageFocus').attr('id'));
            }
            view = "liveChannels";
            $("#mainContent").html('');
            $(".imageFocus").removeClass("imageFocus");

            $("#mainContent").html(Util.liveDetailsPage());

            Main.fetchAccToSortingLive();
            //  console.log(items);

            loadLiveData(liveSectionDetails);

            $("#liveChannel-0").addClass('imageFocus');
            $("#mainContent").show();
            $("#liveChannel-0").addClass('playing');
            playingIndex = 0;
            if (currentAPPType == "m3u") {
                playingChannel = liveSectionDetails[0].url;
            } else {
                playingChannel = liveSectionDetails[0].stream_id;
            }
            Player.data = null;
            Player.type = "live";
            playerLiveIndex = 0;

            jQuery(".norecordfound").show();
            $('#videoHtml').css('background', 'black');
            var PlayerDIvSelector = $('#player-wrapper');
            PlayerDIvSelector.html('');
            PlayerDIvSelector.attr('class', '');
            PlayerDIvSelector.css('text-align', 'center');
            PlayerDIvSelector.html('<div class="erroronplayer"><span>No Record Found</span></div>');
            jQuery(".imageFocus").removeClass("imageFocus");
            jQuery("#rightLiveArrow").addClass("imageFocus");
            if (currentAPPType == "m3u") {
                Main.HideLoading();
            }

        }



    }



}



var epgData = '';
Main.getEPG = function (id) {
    //Main.ShowLoading();
    $.ajax({
        url: Main.profile.user_info.login_url + "/player_api.php?username=" + Main.profile.user_info.username + "&password=" + Main.profile.user_info.password + "&action=get_short_epg&stream_id=" + id,
        type: "GET",
        data: {},
        success: function (data) {
            //Main.HideLoading();
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            epgData = data;
            Main.updateEPG();
        },
        error: function (errObj) {
            Main.HideLoading();
            Main.showFailure("Something went wrong. Please try again.");
        },
        timeout: 80000
    });
}


Main.updateEPG = function () {
    var Text = '';
    Text += '<div style="    display: table; height: 100%;  margin: 0; padding: 0; width: 100%;"> '
    if (epgData.epg_listings.length) {
        for (var i = 0; i < epgData.epg_listings.length; i++) {
            if (i < 4) {
                if (i == 0)
                    Text += '<div class="row1 selectedEPG" source= "epgList" epgID="' + epgData.epg_listings[i].epg_id + '" id="epgList-' + i + '" index=' + i + ' count="' + epgData.epg_listings.length + '"><div class="epgRow"><span>' + getTwoHours2(epgData.epg_listings[i].start) + " - " + getTwoHours2(epgData.epg_listings[i].end) + "</span><b style='margin-left:20px;margin-right:20px;'> => </b>" + '<p>' + Main.b64DecodeUnicode(epgData.epg_listings[i].title) + '</p></div></div>'
                else
                    Text += '<div class="row1" source= "epgList" epgID="' + epgData.epg_listings[i].epg_id + '" id="epgList-' + i + '" index=' + i + ' count="' + epgData.epg_listings.length + '"><div class="epgRow"><span>' + getTwoHours2(epgData.epg_listings[i].start) + " - " + getTwoHours2(epgData.epg_listings[i].end) + "</span><b style='margin-left:20px;margin-right:20px;'> => </b>" + '<p>' + Main.b64DecodeUnicode(epgData.epg_listings[i].title) + '</p></div></div>'

            }
            else
                Text += '<div class="row1"  source= "epgList" epgID="' + epgData.epg_listings[i].epg_id + '"  id="epgList-' + i + '" index=' + i + ' count="' + epgData.epg_listings.length + '" style="display:none"><div class="epgRow"><span>' + getTwoHours2(epgData.epg_listings[i].start) + " - " + getTwoHours2(epgData.epg_listings[i].end) + "</span><b style='margin-left:20px;margin-right:20px;'> => </b>" + '<p>' + Main.b64DecodeUnicode(epgData.epg_listings[i].title) + '</p></div></div>'

        }
    }
    Text += '</div>'
    $(".epgListing").html(Text);
}
function getBOXDetails() {
    try {
        try {
            if (document.cookie) {
                cookieBoxNo = read_cookie('boxNo');
                cookieSupported = true;
                // console.log("cookie support is there")
            }
        } catch (e) {
            // console.log("No cookie support");
        }

        if (cookieBoxNo == null) {
            if (typeof (Storage) !== "undefined") {
                if (localStorage.getItem("boxNo") === null) {
                    var bxN = uuid.v1().replaceAll("-", "").substr(0, 12).toUpperCase();
                    localStorage.setItem("boxNo", bxN);
                    return bxN;
                } else {
                    var boxNo = localStorage.getItem("boxNo");
                    if (cookieSupported)
                        write_cookie('boxNo', boxNo);
                    return boxNo;
                }
            } else {
                var bxN = uuid.v1().replaceAll("-", "").substr(0, 12).toUpperCase();
                localStorage.setItem("boxNo", bxN);
                return bxN;
            }
        } else {
            return cookieBoxNo;
        }
    } catch (e) {
        return "ERROR";
    }

}
function write_cookie(name, value) {
    var expiration_date = new Date();
    expiration_date.setFullYear(2040);
    expiration_date = expiration_date.toGMTString();

    var cookie_string = escape(name) + "=" + escape(value) + "; expires="
        + expiration_date;
    document.cookie = cookie_string;
}
function read_cookie(key) {

    var cookie_string = "" + document.cookie;
    var cookie_array = cookie_string.split("; ");

    for (var i = 0; i < cookie_array.length; ++i) {
        var single_cookie = cookie_array[i].split("=");
        if (single_cookie.length != 2)
            continue;
        var name = unescape(single_cookie[0]);
        var value = unescape(single_cookie[1]);

        if (key == name)
            return value;
    }
    // Cookie was not found:
    return null;
}

function hideDeleteUserPopUp() {
    $("#genericDiv").hide();
    $("#genericDiv").html('');
    try {
        var obj = popState();
        view = obj.view;
        $("#" + obj.focus).addClass("imageFocus");
    } catch (e) { }
}






var $navlist = $('#navlist');
var $tabContainer = $('#tab-container');
var $panels = $('#panels');

$navlist.on('keydown', 'li a', function (keyVent) {
    var arrows = [37, 38, 39, 40];
    var which = keyVent.which;
    var target = keyVent.target;
    if ($.inArray(which, arrows) > -1) {
        var adjacentTab = findAdjacentTab(target, $navlist, which);

        if (adjacentTab) {
            keyVent.preventDefault();
            adjacentTab.focus();
            // if desired behavior is that when tab receives focus -> make it the active tab:
            setActiveAndInactive(adjacentTab, $navlist);
        }
    } else if (which === 13 || which === 32) { // ENTER |or| SPACE
        keyVent.preventDefault(); // don't scroll the page around...
        target.click();
    } else if (which === 34) { // PAGE DOWN
        keyVent.preventDefault(); // don't scroll the page
        var assocPanel = $('#' + this.getAttribute('aria-controls'));
        if (assocPanel) {
            assocPanel.focus();
        }
    }
});

$(document.body).on('keydown', '.panel', function (e) {
    if (e.which === 33) { // PAGE UP
        e.preventDefault(); // don't scroll
        var activeTab = $navlist.find('li.active a')[0];
        if (activeTab) {
            activeTab.focus();
        }
    }
});

// click support
$navlist.on('click', 'li a', function () {
    setActiveAndInactive(this, $navlist);
});

function findAdjacentTab(startTab, $list, key) {
    var dir = (key === 37 || key === 38) ? 'prev' : 'next';
    var adjacentTab = (dir === 'prev') ?
        $(startTab.parentNode).prev()[0] :
        $(startTab.parentNode).next()[0];

    if (!adjacentTab) {
        var allTabs = $list.find('li');
        if (dir === 'prev') {
            adjacentTab = allTabs[allTabs.length - 1];
        } else {
            adjacentTab = allTabs[0];
        }
    }

    return $(adjacentTab).find('a')[0];
}

function setActiveAndInactive(newActive, $list) {
    // alert(newActive);
    // alert($list);
    $list.find('li').each(function () {
        var assocPanelID = $(this)
            .find('a')
            .first()
            .attr('aria-controls');
        var anchor = $(this).find('a')[0];

        if (this !== newActive.parentNode) {
            $(this).removeClass('active');
            anchor.tabIndex = -1;
            anchor.setAttribute('aria-selected', 'false');
            $('#' + assocPanelID)
                .removeClass('current')
                .attr('aria-hidden', 'true');
        } else {
            $(this).addClass('active');
            anchor.tabIndex = 0;
            anchor.setAttribute('aria-selected', 'true');
            $('#' + assocPanelID)
                .addClass('current')
                .removeAttr('aria-hidden');
        }

    });
}

// initial configuration based on window's width
var isAccordionView = false;
var isTabsView = false;

determineView();

// Debounced Resize() jQuery Plugin
// Author: Paul Irish
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartresize
    jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');


// RESIZE EVENT:
$(window).smartresize(determineView);


function determineView() {
    var winWidth = $(window).width();

    if (winWidth <= 800 && !isAccordionView) { // SHOW ACCORDION VIEW
        // switch to the accordion view
        $tabContainer
            .removeClass('tabs-view')
            .addClass('accordion-view');

        // fix the markup to be more suited for accordions
        $panels.find('.panel').each(function () {
            var panelID = this.id;
            var assocLink = panelID && $('#navlist a[aria-controls="' + panelID + '"]')[0];
            if (assocLink) {
                $(assocLink.parentNode).append(this);
            }
        });

        isAccordionView = true;
        isTabsView = false;
    } else if (winWidth > 800 && !isTabsView) { // SHOW TABS VIEW
        var wasAccordion = $tabContainer.hasClass('accordion-view');
        // switch to the tabs view
        $tabContainer
            .removeClass('accordion-view')
            .addClass('tabs-view');

        if (wasAccordion) {
            $navlist.find('.panel').each(function () {
                $panels.append(this);
            });
        }

        isTabsView = true;
        isAccordionView = false;
    }
}

function showSearchModal(type) {
    pushState(view, $(".imageFocus").attr("id"));
    $(".imageFocus").removeClass("imageFocus");
    view = type;
    $("#customMessage").html(Util.searchPopUp(view));
    $("#customMessage").show();
    $("#searchedText").focus();
}
function showSortingModal(type) {
    pushState(view, $(".imageFocus").attr("id"));
    $(".imageFocus").removeClass("imageFocus");
    view = type;
    $("#customMessage").html(Util.sortPopUp(view));
    $("#customMessage").show();
}

function showALLRecords(sortingType) {
    // alert("abc");
    // alert(vodSectionDetailsFullData.length);
    // console.log(JSON.stringify(vodSectionDetailsFullData));

    if (vodSectionDetailsFullData.length > 0) {
        var moviesData1 = vodSectionDetailsFullData.slice();
        var moviesData2 = vodSectionDetailsFullData.slice();
        var moviesData3 = vodSectionDetailsFullData.slice();
        var moviesData4 = vodSectionDetailsFullData.slice();


        if (sortingType == "topadded") {
            if (pageType == "movies") {
                var moviesData_topadded = helper.arr.multisort(moviesData3, ['added'], ['DESC']);
            } else {
                var moviesData_topadded = helper.arr.multisort(moviesData3, ['last_modified'], ['DESC']);
            }
        } else if (sortingType == "toprated") {
            var moviesData_toprated = helper.arr.multisort(moviesData4, ['rating_5based'], ['DESC']);
        } else if (sortingType == "atoz") {
            var moviesData_atoz = helper.arr.multisort(moviesData1, ['name'], ['ASC']);
        } else if (sortingType == "ztoa") {
            var moviesData_ztoa = helper.arr.multisort(moviesData2, ['name'], ['DESC']);
        }


        // console.log(JSON.stringify(moviesData_atoz));


        // var searchedResult = compareStringSearch($("#searchedText").val(),vodSectionDetailsFullData);
        //           vodSectionDetails = searchedResult;
        //           vodSectionDetails.category = vodSectionDetailsFullData.category;

        //           movieSectionDefaultWithoutSorting = '';
        //           movieSectionDefaultWithoutSortingCategories = '';

        //           movieSectionDefaultWithoutSortingCategories = JSON.stringify(vodSectionDetails.category);
        //           movieSectionDefaultWithoutSorting = JSON.stringify(vodSectionDetails);

        //            var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

        //           if(vodSectionDetails.length>0){

        hideValues();
        $("#mainContent").html('');
        $(".imageFocus").removeClass("imageFocus");
        if (sortingType == "topadded") {
            if (pageType == "movies") {
                $("#mainContent").html(Util.vodMoviesPage(moviesData_topadded, "viewALL", sortingType));
            } else {
                $("#mainContent").html(Util.vodMoviesPage(moviesData_topadded, "viewALL", sortingType));
            }
        } else if (sortingType == "toprated") {
            $("#mainContent").html(Util.vodMoviesPage(moviesData_toprated, "viewALL", sortingType));
        } else if (sortingType == "atoz") {
            $("#mainContent").html(Util.vodMoviesPage(moviesData_atoz, "viewALL", sortingType));
        } else if (sortingType == "ztoa") {
            $("#mainContent").html(Util.vodMoviesPage(moviesData_ztoa, "viewALL", sortingType));
        }

        // $("#vodMovies-0-0").addClass('imageFocus');
        $("#mainContent").show();
        check_if_in_view();

        // $('#moviesList').animate({scrollTop: '-100'},500);

        // $("#clearSearch").css("display", "block");

        // $("#searchResult").html(searchedResultText);
        if (vodSectionDetailsFullData.length > moviesLoadPerPage) {
            $("#loadmore_movies").show();
        } else {
            $("#loadmore_movies").hide();
        }
        // $("#searchResult").show();
        try {
            var obj = popState();
            view = obj.view;

        } catch (e) { }
        $(".overlay-screen").hide();

        //           }else{
        //               if(pageType == "movies"){
        //                    $(".error").html("No Movie Found!");
        //               }else{
        //                    $(".error").html("No Series Found!");
        //               }
        //           }
    } else {
        if (pageType == "movies") {
            // alert("no movie found")
            $(".error").html("No Movie Found!");
        } else {
            // alert("no series found");
            $(".error").html("No Series Found!");
        }
    }
}
function viewALLRecords(type, sortingType) {
    pushState(view, $(".imageFocus").attr("id"));
    $(".imageFocus").removeClass("imageFocus");
    view = type;
    showALLRecords(sortingType);
    // $("#customMessage").html(Util.searchPopUp(view));
    // $("#customMessage").show();
}
function clearSearchedRecords(type) {

    if (type == "channels") {
        liveSectionDetails = liveSectionDetailsFullData;
        liveSectionDetails.category = liveSectionDetailsFullData.category;
        liveSectionDefaultWithoutSorting = '';
        liveSectionDefaultWithoutSortingCategories = '';

        liveSectionDefaultWithoutSortingCategories = JSON.stringify(liveSectionDetails.category);
        liveSectionDefaultWithoutSorting = JSON.stringify(liveSectionDetails);
        $(".liveChannels").html('');
        $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));
        Main.fetchAccToSortingLive();

        loadLiveData(liveSectionDetails);


        $(".imageFocus").removeClass("imageFocus");
        $("#liveChannel-0").addClass('imageFocus');
        $("#clearSearch").css("display", "none");
        $("#customMessage").hide();
        // $("#customMessage").html('');

        $("#searchResultLive").html('');
        $("#searchResultLive").hide();

        //             Player.playStream(playUrl,true);


    } else if (type == "movies") {
        vodSectionDetails = vodSectionDetailsFullData;
        vodSectionDetails.category = vodSectionDetailsFullData.category;

        movieSectionDefaultWithoutSorting = '';
        movieSectionDefaultWithoutSortingCategories = '';

        movieSectionDefaultWithoutSortingCategories = JSON.stringify(vodSectionDetails.category);
        movieSectionDefaultWithoutSorting = JSON.stringify(vodSectionDetails);


        $("#mainContent").html('');
        $(".imageFocus").removeClass("imageFocus");
        $("#mainContent").html(Util.vodMoviesPage(vodSectionDetails));
        $("#vodMovies-0-0").addClass('imageFocus');
        $("#mainContent").show();
        $("#clearSearch").css("display", "none");
    } else if (type == "liveCategories" || type == "MoviesCategories" || type == "SeriesCategories" || type == "CatchupCategories") {
        vodSectionDetails = sectionData;
        $("#channelContent").html(Util.listSectionPage(vodSectionDetails));
        var mainArray = [];

        for (var i = 0; i < sectionData.length; i++) {
            var tempArray = [];

            box = {
                category_id: sectionData[i].category_id,
                category_name: sectionData[i].category_name,
                parent_id: sectionData[i].parent_id,
                index_number: i,

            }
            tempArray.push(box);

            if ((i + 1) < sectionData.length) {
                i++;
                box = {
                    category_id: sectionData[i].category_id,
                    category_name: sectionData[i].category_name,
                    parent_id: sectionData[i].parent_id,
                    index_number: i,

                }
                tempArray.push(box);
            }

            mainArray.push(tempArray);

        }
        mainArray.type = sectionData.type;
        mainArray.sectionType = sectionData.sectionType;


        categoriesSection(mainArray);
        $("#channelContent").show();

        $("#clearSearch").css("display", "none");
    }


}


Main.b64DecodeUnicode = function (str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}














var sectionDataLive = '';
var sectionDataLiveTemp = '';
var sectionDataM3uArray = '';
var playlistItemTemp = '';
var playlistItemArrayTemp = '';

Main.getSectionsM3U = function (action, sectionType) {
    sectionData = [];
    if (playlistItemArrayTemp == "") {
        // console.log("AA");
        // console.log(Main.profile);
        // alert("SectionType:"+sectionType);
        if (Main.profile.m3uType == "file") {
            if (sectionType == "multiscreen") {
                Main.fetchM3UDataFile(Main.profile.playlistname, Main.profile.m3uLine, "multiscreen", "multiscreenCategoriesSections", Main.profile.m3uType);
            } else {
                Main.fetchM3UDataFile(Main.profile.playlistname, Main.profile.m3uLine, "multiscreen", "sections", Main.profile.m3uType);
            }
        } else if (Main.profile.m3uType == "url") {
            if (sectionType == "multiscreen") {
                Main.fetchM3UData(Main.profile.playlistname, Main.profile.m3uLine, "multiscreen", "multiscreenCategoriesSections", Main.profile.m3uType);
            } else {
                Main.fetchM3UData(Main.profile.playlistname, Main.profile.m3uLine, "multiscreen", "sections", Main.profile.m3uType);
            }
        }
    } else {

        // alert(sectionType);
        sectionData[0] = { category_id: "ALL", category_name: "ALL", parent_id: 0 };
        if (sectionType != "catchup" && sectionType != "multiscreen") {
            sectionData[1] = { category_id: "FAVOURITE", category_name: "FAVOURITE", parent_id: 0 };
        }


        sectionData = $.merge($.merge([], sectionData), sectionDataLive);

        sectionData.type = action;
        sectionData.sectionType = sectionType;
        pushState(view, $(".imageFocus").attr("id"));
        $(".imageFocus").removeClass("imageFocus");
        if (sectionType == "multiscreen") {
            view = "multiscreenCategoriesSections"
        } else {
            view = "sections"
        }
        Main.processNext();
        Main.HideLoading();



    }

}

Main.fetchM3UDataFile = function (playlistname, filePath, loginType, redirectPage, m3uType) {
    //  console.log(playlistname);
    //  console.log(filePath);
    //  console.log();



    localStorage.setItem("currentAPPType", "m3u");
    currentAPPType = localStorage.getItem("currentAPPType");
    Main.ShowLoading();

    try {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                // console.log("An error ocurred reading the file :" + err.message);
                Main.HideLoading();
                var oldView = view;

                Main.showFailure("Invalid M3U File!");
                if (oldView == "signIn") {
                    $("#signIn").show();
                } else {
                    $("#mainContent").show();
                }
                return;
            }

            //     fileDataTemp = data;
            // Change how to handle the file content
            // console.log("The file size is : " + data.length);
            Main.ParsingM3UData(data, playlistname, filePath, loginType, redirectPage, m3uType);

        });
    } catch (e) {
        Main.HideLoading();
        var oldView = view;

        Main.showFailure("Invalid M3U File!");
        if (oldView == "signIn") {
            $("#signIn").show();
        } else {
            $("#mainContent").show();
        }
        return;
    }



    // Main.HideLoading();

}

var retryingCount = 0;
Main.fetchM3UData = function (playlistname, enteredUrl, loginType, redirectPage, m3uType) {

    localStorage.setItem("currentAPPType", "m3u");
    currentAPPType = localStorage.getItem("currentAPPType");
    Main.HideLoading();

    var fullFileData = '';

    $('.progress').removeClass('hide');
    $('#progress-message').html('Downloading Live,Movies and Series');
    document.getElementById("progress-bg").style.display = "block";
    $('.progress-bar').css({
        "width": '0%',
        "background-color": "#007bff"
    });
    $('.progress-bar').html('0%');

    $.ajax({

        xhr: function () {
            var xhr = new window.XMLHttpRequest();

            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    retryingCount = 0;
                    var percentComplete = evt.loaded / evt.total;
                    var percentvalue = percentComplete * 100 + '%';
                    //   console.log(percentComplete);
                    $('.progress-bar').css({
                        "width": percentComplete * 100 + '%',
                        "background-color": "#007bff"
                    });

                    $('.progress-bar').html(parseInt(percentvalue) + '%');
                    $('.progress-bar').attr("aria-valuenow", percentvalue);
                    if (percentComplete === 1) {
                        $('.progress').addClass('hide');
                        document.getElementById("progress-bg").style.display = "none";
                        $('#progress-message').html('');
                    }
                }
            }, false);
            return xhr;
        },
        //                        url: "http://ott.dobratv.net:25461/showPlaylist.php?m3u=get&dId=174&deviceUser=RriJrAd1EFu2R7SF&devicePass=77O5JOOEa3F98OPZ",
        //                      url: "http://novi.etnoselo.tv:25461/get.php?username=srdjanmoja&password=novipass123&type=m3u_plus&output=ts",
        //                      url : "http://worldjj.ddns.net:25461/get.php?username=TEST&password=TEST&type=m3u&output=ts",
        //   url : "http://worldjj.ddns.net:25461/get.php?username=TEST&password=TEST&type=m3u_plus&output=ts",
        //                 url : "http://pure-iptv.com:8000/get.php?username=testapp&password=apptest&type=m3u_plus&output=ts",
        //                 url : "http://kleenair.org:2095/get.php?username=Smarters&password=POWSBMGW&type=m3u_plus&output=ts",
        //   url : "http://media.otvnow.com:25461/get.php?username=main&password=main&type=m3u_plus&output=mpegts",
        //   url : "http://qqtv.nl/get.php?username=appletest&password=appletest&type=m3u_plus&output=mpegts",
        // url : "http://worldjj.ddns.net:25461/get.php?username=TEST&password=TEST&type=m3u&output=ts",

        url: enteredUrl,
        type: "GET",
        data: {},
        success: function (data) {
            $('.progress').addClass('hide');
            document.getElementById("progress-bg").style.display = "none";
            $('#progress-message').html('');

            hideValues();

            Main.ParsingM3UData(data, playlistname, enteredUrl, loginType, redirectPage, m3uType);






        },
        error: function (errObj) {
            retryingCount++;
            if (retryingCount <= 5) {
                $('.progress-bar').css({
                    "width": "100%",
                    "background-color": "red"
                });
                $('.progress-bar').html('');
                $('.progress-bar').attr("aria-valuenow", 0);
                $('.progress').removeClass('hide');
                if (retryingCount == 1) {
                    $('#progress-message').html('Something went wrong.');
                }
                document.getElementById("progress-bg").style.display = "block";
                setTimeout(
                    function () {
                        $('#progress-message').html('Retrying (' + retryingCount + '/5)');
                        setTimeout(
                            function () {
                                Main.fetchM3UData(playlistname, enteredUrl, loginType, redirectPage, m3uType);

                            }, 2000);
                    }, 2000);
            } else {
                retryingCount = 0;
                $('.progress').addClass('hide');
                document.getElementById("progress-bg").style.display = "none";
                $('#progress-message').html('');

                //   pushState(view,$(".imageFocus").attr("id"));
                //   $(".imageFocus").removeClass("imageFocus");
                //   view = 'maximumLimitReached';
                //   $("#customMessage").html(Util.maximumLimitReachedPopUp(view));
                //   $("#customMessage").show();

                //                              alert("Maximum limit reached!")

                Main.HideLoading();
                var oldView = view;

                Main.showFailure("Unable to download data. Please try again later.");

                if (oldView == "signIn") {
                    $("#signIn").show();
                } else {
                    $("#mainContent").show();
                }
            }






        },
        timeout: 180000
    });
}
Main.b64DecodeUnicode = function (str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

Main.b64EncodeUnicode = function (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

Main.getM3UFavouritesFromArrow = function () {
    var allLiveFavourites = JSON.parse(localStorage.getItem("allM3UFavourites"));
    if (allLiveFavourites !== null) {
        for (var j = 0; j < allLiveFavourites.length; j++) {
            if (allLiveFavourites[j][0] == Main.profile.m3uLine) {
                var items = allLiveFavourites[j][1];
            }
        }
        if (items !== null && items !== undefined && items.length > 0) {
            if (playlistItemArrayTemp !== null && playlistItemArrayTemp.length > 0) {
                var obj = [];
                for (var i = 0; i < playlistItemArrayTemp.length; i++) {
                    if (items != null && jQuery.inArray(playlistItemArrayTemp[i].url, items) != -1) {
                        obj.push(playlistItemArrayTemp[i]);
                    }
                }
                Main.HideLoading();
                loadLivePageData(obj, true);

            } else {
                Main.HideLoading();
                loadLivePageData([], true);

            }
        } else {
            Main.HideLoading();
            loadLivePageData([], true);
        }
    } else {
        Main.HideLoading();
        loadLivePageData([], true);
    }
}

Main.checkURLExistsM3U = function (url, callback) {

    $.ajax({
        type: 'HEAD',
        url: url,
        success: function () {
            callback(true);
        },
        error: function () {
            callback(false);
        }
    });

}

Main.ParsingM3UData = function (data, playlistname, enteredUrl, loginType, redirectPage, m3uType) {
    var foundURL = false;
    var needToCheck = true;
    var totalUrls = 0;
    var EXT_M3U = "#EXTM3U";
    var EXT_INF = "#EXTINF";
    var EXT_PLAYLIST_NAME = "#PLAYLIST";
    var EXT_LOGO = "tvg-logo";
    var EXT_ID = "tvg-id";
    var EXT_ID_CAPITAL = "tvg-ID";
    var EXT_NAME = "tvg-name";
    var EXT_GROUP_TITLE = "group-title";
    var EXT_URL = "http://";
    var EXT_URL_HTTPS = "https://";

    // console.log(data);
    // console.log(data.length);
    if (data !== null && data !== undefined && data.length > 0 && data.indexOf(EXT_INF) != -1) {
        // console.log(EXT_INF + " found");
        var linesArray = data.split(EXT_INF);
        var num = 0;
        var i;
        var categoryIndexTemp = 0;
        var categoryIndex = 0;
        sectionDataM3uArray = [];
        sectionDataLive = [];
        sectionDataLiveTemp = [];
        playlistItemArrayTemp = [];


        // console.log(linesArray.length);
        // console.log(linesArray);

        for (i = 0; i < linesArray.length; i++) {

            //                     if(num >1000){
            //                     break;
            //                     }

            num++;
            var currLine = linesArray[i];
            var categoryName = "";
            var epgID = "";
            var channelName = "";
            var playlistItemObjTemp = {};
            if (currLine.indexOf(EXT_M3U) != -1 || currLine == "" || currLine == "#") {
                continue;
            }

            if ((currLine.indexOf(EXT_LOGO) != -1) || (currLine.indexOf(EXT_GROUP_TITLE) != -1) || (currLine.indexOf(EXT_NAME) != -1)) {
                var words1 = currLine.split("\"");
                for (var j = 0; j < words1.length; j++) {

                    if ((words1[j].indexOf(EXT_ID) != -1) || (words1[j].indexOf(EXT_ID_CAPITAL) != -1)) {
                        if ((j + 1) < words1.length) {
                            epgID = words1[j + 1];
                            playlistItemObjTemp.epgChannelId = epgID;

                            //alert("EPG ID:"+words1[j + 1]);
                        }
                        else {
                            playlistItemObjTemp.epgChannelId = "";
                        }
                        continue;
                    }
                    if ((words1[j].indexOf(EXT_NAME) != -1)) {
                        if ((j + 1) < words1.length) {
                            channelName = words1[j + 1];
                            playlistItemObjTemp.name = channelName;
                        }
                        else {
                            playlistItemObjTemp.name = "";
                        }
                        continue;
                    }
                    if ((words1[j].indexOf(EXT_LOGO) != -1)) {
                        if ((j + 1) < words1.length) {
                            stream_icon = words1[j + 1];
                            playlistItemObjTemp.stream_icon = stream_icon;
                        }
                        else {
                            playlistItemObjTemp.stream_icon = "";
                        }
                        continue;
                    }
                    if ((words1[j].indexOf(EXT_GROUP_TITLE) != -1)) {
                        if ((j + 1) < words1.length) {
                            categoryName = words1[j + 1];
                            if (categoryName != "") {
                                playlistItemObjTemp.category_id = Main.b64EncodeUnicode(categoryName);
                                //                                                if(categoryIndexTemp == 700){
                                //                                                break;
                                //                                                }
                                sectionDataLiveTemp[categoryIndexTemp] = {
                                    category_id: Main.b64EncodeUnicode(categoryName),
                                    category_name: categoryName,
                                    parent_id: 0
                                };
                                categoryIndexTemp++;
                            }
                            //                                                alert(JSON.stringify(sectionDataLive));
                            //                                                alert(sectionDataLive);

                        }
                        else {

                        }
                        continue;
                    }

                }

            }

            var name = "";
            //                        var name = "";
            if ((currLine.indexOf(EXT_LOGO) != -1) || (currLine.indexOf(EXT_GROUP_TITLE) != -1) || (currLine.indexOf(EXT_NAME) != -1)) {
                if ((currLine.indexOf(EXT_URL) != -1)) {

                    try {
                        //                                        name = currLine.substring(currLine.indexOf("\",")+2, currLine.lastIndexOf(EXT_URL)).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf(EXT_URL)).split("\n").join("");

                    } catch (e) {
                        //                                        name = currLine.substring(currLine.indexOf("\",")+2, currLine.lastIndexOf("\n")).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf("\n")).split("\n").join("");
                    }

                } else if ((currLine.indexOf(EXT_URL_HTTPS) != -1)) {
                    try {
                        //                                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf(EXT_URL_HTTPS)).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf(EXT_URL_HTTPS)).split("\n").join("");
                    } catch (e) {
                        //                                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf("\n")).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 2, currLine.lastIndexOf("\n")).split("\n").join("");
                    }
                }

            } else {
                if ((currLine.indexOf(EXT_URL) != -1)) {
                    try {
                        //                                 name = currLine.substring(currLine.indexOf("\",") + 5, currLine.lastIndexOf(EXT_URL)).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 5, currLine.lastIndexOf(EXT_URL)).split("\n").join("");
                    } catch (e) {
                        name = "";
                    }
                } else if ((currLine.indexOf(EXT_URL_HTTPS) != -1)) {
                    try {
                        //                                 name = currLine.substring(currLine.indexOf("\",") + 5, currLine.lastIndexOf(EXT_URL_HTTPS)).replace("\n", "");
                        name = currLine.substring(currLine.indexOf("\",") + 5, currLine.lastIndexOf(EXT_URL_HTTPS)).split("\n").join("");
                    } catch (e) {
                        name = "";
                    }
                }
            }


            if ((currLine.indexOf(EXT_URL) != -1)) {
                try {
                    //                             url = currLine.substring(currLine.lastIndexOf(EXT_URL)).replace("\n", "").replace("\r", "");
                    url = currLine.substring(currLine.lastIndexOf(EXT_URL)).split("\n").join("").split("\r").join("");
                } catch (e) {
                    url = "";
                }
            } else if ((currLine.indexOf(EXT_URL_HTTPS) != -1)) {
                try {
                    //                             url = currLine.substring(currLine.lastIndexOf(EXT_URL_HTTPS)).replace("\n", "").replace("\r", "");
                    url = currLine.substring(currLine.lastIndexOf(EXT_URL_HTTPS)).split("\n").join("").split("\r").join("");
                } catch (e) {
                    url = "";
                }
            }

            playlistItemObjTemp.name = name;
            playlistItemObjTemp.num = num;
            playlistItemObjTemp.url = url;


            if (categoryName == "") {
                playlistItemObjTemp.category_id = "ALL";
            }
            //playlistItem.setName(name);
            //                       playlistItem.setNum(num);
            //                       playlistItem.setUrl(url);


            playlistItemArrayTemp.push(playlistItemObjTemp);
            // console.log(url);
            // if(foundURL == false && needToCheck ==true){
            // console.log(url+" ===> "+allServers);
            if (Main.multiDNS == true) {
                var allServers = Main.serverURL;

                if (allServers.indexOf(',') > -1) {

                    var allServerURLs = allServers.split(',');
                    // console.log(url+" => "+allServers);
                    // console.log(url);
                    // console.log(allServerURLs);

                    for (var ind = 0; ind < allServerURLs.length; ind++) {
                        var singleURL = allServerURLs[ind];
                        // console.log(allServerURLs);
                        // console.log(url+" : "+singleURL);

                        if (url.indexOf(singleURL) != -1) {
                            totalUrls++;
                            break;
                        }
                    }
                }
            } else {
                if (url.indexOf(Main.serverURL) != -1) {
                    totalUrls++;
                }
            }

            // if(foundURL == false && needToCheck ==true){
            //     if(url.indexOf(Main.serverURL) != -1){
            //         foundURL = true;
            //         needToCheck = false;
            //         // console.log(Main.serverURL + ": found");
            //     }else{
            //         needToCheck = true;
            //         Main.HideLoading();
            //         var oldView = view;

            //         if(m3uType == "file"){
            //             Main.showFailure("Invalid M3U File!");
            //         }else if(m3uType == "url"){
            //             Main.showFailure("Invalid M3U URL!");
            //         }
            //         if(oldView == "signIn"){
            //             $("#signIn").show();
            //         }else{
            //             $("#mainContent").show();
            //         }
            //         return;
            //         // console.log(Main.serverURL + ": not found");
            //     }
            // }


        }


        console.log("Total array size : " + playlistItemArrayTemp.length);
        console.log("Total found url size : " + totalUrls);

        try {
            var percentageIndecimal = (totalUrls / playlistItemArrayTemp.length) * 100;
            var percentageRound = Math.round(percentageIndecimal);
        } catch (e) {
            var percentageRound = 0;
        }

        console.log(percentageRound);
        if (percentageRound > 90) {



            sectionDataM3uArray = _.groupBy(sectionDataLiveTemp, 'category_name');

            $.each(sectionDataM3uArray, function (key, value) {

                sectionDataLive[categoryIndex] = {
                    category_id: Main.b64EncodeUnicode(key),
                    category_name: key,
                    parent_id: 0
                };
                categoryIndex++;

            });

            //                    sectionDataM3U = sectionDataLive;
            // console.log(JSON.stringify(sectionDataLive));

            sectionDataLiveTemp = '';
            sectionDataM3uArray = '';
            //                        alert("Categories:"+sectionDataLive.length);
            //                        alert("Channels Movies Series:"+playlistItemArrayTemp.length);





            sectionData[0] = { category_id: "ALL", category_name: "ALL", parent_id: 0 };

            if (redirectPage != "multiscreenCategoriesSections") {
                sectionData[1] = { category_id: "FAVOURITE", category_name: "FAVOURITE", parent_id: 0 };
            }


            sectionData = $.merge($.merge([], sectionData), sectionDataLive);



            sectionData.type = "get_live_categories";
            if (redirectPage == "multiscreenCategoriesSections") {
                sectionData.sectionType = "multiscreen";
            } else {
                sectionData.sectionType = "live";
            }
            pushState(view, $(".imageFocus").attr("id"));
            $(".imageFocus").removeClass("imageFocus");



            var item = localStorage.getItem("listDataM3U");

            var obj = [];
            if (item !== null) {
                obj = JSON.parse(item);
            }


            var newObj = {};
            newObj = {
                "playlistname": playlistname,
                "username": "playlist",
                "password": "playlist",
                "m3uLine": enteredUrl,
                "m3uType": m3uType
            }

            obj.push(newObj);

            if (loginType != "multiscreen") {
                localStorage.setItem("listDataM3U", JSON.stringify(obj));
            }

            localStorage.setItem("profile", JSON.stringify(newObj));


            view = redirectPage
            hideValues();
            Main.processNext();
            Main.HideLoading();
        } else {
            Main.HideLoading();
            var oldView = view;

            if (m3uType == "file") {
                Main.showFailure("Invalid M3U File!");
            } else if (m3uType == "url") {
                Main.showFailure("Invalid M3U URL!");
            }
            if (oldView == "signIn") {
                $("#signIn").show();
            } else {
                $("#mainContent").show();
            }
        }


    } else {
        Main.HideLoading();
        var oldView = view;

        if (m3uType == "file") {
            Main.showFailure("Invalid M3U File!");
        } else if (m3uType == "url") {
            Main.showFailure("Invalid M3U URL!");
        }
        if (oldView == "signIn") {
            $("#signIn").show();
        } else {
            $("#mainContent").show();
        }
    }
}


Main.fetchAccToSortingLive = function () {
    var sortingType = localStorage.getItem('liveSorting');
    if (sortingType == "" || sortingType == null) {
        sortingType = "default";
    }
    //                       alert(sortingType);

    if (sortingType == "default") {

        var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
        var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
        liveSectionDetails = liveDataWithoutCategories;
        liveSectionDetails.category = liveDataCategories;

        //              abc = abcd.livesectiondetails;
        //              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
    } else if (sortingType == "atoz") {
        var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
    } else if (sortingType == "ztoa") {
        var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
    } else if (sortingType == "topadded") {
        var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
    } else if (sortingType == "channelnum_asc") {
        var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
    } else if (sortingType == "channelnum_desc") {
        var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
    }

    if (sortingType != "default") {
        liveSectionDetails = abc;
    }


}

    