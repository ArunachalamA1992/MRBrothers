//import liraries
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import {StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';
import {scr_width} from '../../Utils/Dimensions';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';

const privacyData = [
  {
    id: '0',
    abt_title: 'Fill details online',
    abt_subText: 'Fill in your details in a fully customized legal template',
  },
];

// create a component
const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: scr_width, alignItems: 'center'}}>
          <View style={{width: scr_width}}>
            <Image
              source={require('../../assets/Banner/privacy.jpg')}
              style={{
                width: scr_width,
                height: 220,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={{width: '95%', padding: 10, paddingVertical: 20}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              PRIVACY POLICY - GENERAL
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                // backgroundColor: 'blue',
                width: scr_width,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                  //   backgroundColor: 'red',
                }}>
                This privacy statement explains how we will use and safeguard
                any information you provide to us using this website and its
                mobile applications.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Our goal is to preserve your privacy at all costs. When using
                our website and its mobile applications, you can be sure that
                any information we request from you that allows us to identify
                you will only be used in compliance with this privacy statement.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                By updating this website, we may occasionally alter our policy.
                You may check this page regularly to make sure any modifications
                have not been made against your preferences.{' '}
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              What We Collect{' '}
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              We might get the following data
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Name
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Email address and contact details{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Demographic data, including interests and preferences
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Additional data related to surveys and/or offers for customers
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              What do we do with the Information Gathered
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              We need your information to better understand your needs and serve
              you, especially for the reasons listed below:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Maintaining records internally
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We might use the data to enhance our offerings in terms of goods
                and services.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Using the email address you have supplied, we may occasionally
                send you promotional emails about upcoming launches, exclusive
                deals, or other information we think you would find interesting.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We could occasionally use your information to get in touch with
                you for market research. We may reach out to you via mail, fax,
                phone, or email. We might use the data to modify the website to
                your preferences.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Security
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              We are dedicated to making sure the security of your information
              is maintained. We have implemented appropriate managerial,
              electronic, and physical safeguards to protect and secure the data
              we gather online to avoid unauthorized access or disclosure.
            </Text>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Use of Cookies
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              A cookie is a small file that requests authorization to be stored
              on the hard disc of your computer. Once you accept, the file is
              added, and the cookie notifies you when you visit a specific
              website or assists in analyzing online traffic.{' '}
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              Cookies enable personalized responses from web apps. By collecting
              and storing information about your preferences, the web
              application can adjust its functionality to your needs,
              preferences, and likes and dislikes.{' '}
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              Cookies from traffic logs are utilized by us to determine which
              pages are being used. This is helpful in the analysis of website
              traffic statistics and helps us make improvements to our website
              to better meet the needs of users. This data is only used for
              statistical analysis; after that, it is deleted from the system.{' '}
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              In general, cookies enable us to track which pages you find useful
              and which you do not, which helps us provide you with a better
              experience on our website. Other than the information you choose
              to share with us, a cookie in no way allows us access to your
              computer or any personal information about you.
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              You have the option to accept or reject cookies. Although the
              majority of web browsers accept cookies by default, you can
              typically change your browser's settings to reject cookies if you
              would like to but You might be unable to fully utilize the website
              and mobile apps.
            </Text>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Controlling Your Personal Information
            </Text>
            <Text
              style={{
                width: scr_width - 50,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              The following are some ways that you can limit how your personal
              information is collected and used:{' '}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Look for the option you can check to say that you do not want
                your information to be used by anyone for direct marketing
                whenever you are asked to fill out a form on the website or
                mobile apps.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                You can revoke your consent at any time by sending us an email
                or writing to us if you have previously consented to us using
                your personal information for direct marketing.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Your personal information will never be sold, given away, or
                leased to a third party without your consent or as required by
                law. If you indicate that you would like this to happen, we may
                use your personal information to send you promotional materials
                about other companies that we believe you might find
                interesting.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                If you think that any of the information we have about you is
                inaccurate or lacking, please contact us as soon as you can by
                email or letter. If any information is proven to be inaccurate,
                we will update it right away.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: scr_width - 50,
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Users can use their registered email address to submit a request
                if they would like to have their account removed from our site.
                The account may be deleted from the platform following success
                verification.
              </Text>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
    }
  }

  function renderFooterItem(item, index) {
    try {
      return (
        <View
          style={{
            width: '95%',
            padding: 10,
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                letterSpacing: 0.5,
                color: 'black',
                fontWeight: '800',
                fontFamily: Manrope.SemiBold,
              }}>
              Contact Us
            </Text>

            <Text
              style={{
                width: '100%',
                paddingHorizontal: 10,
                fontSize: 13,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
                textAlign: 'left',
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>
            <Text
              style={{
                width: '100%',
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.lightBlack,
                paddingTop: 10,
                fontFamily: Manrope.SemiBold,
                textAlign: 'left',
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              271, Karuppa Goundar St, Town Hall, Coimbatore, Tamil Nadu 641001,
              India{' '}
            </Text>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}
              onPress={() => {
                Linking.openURL('tel:9787-760-000');
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={14}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  letterSpacing: 0.5,
                  fontFamily: Manrope.SemiBold,
                  paddingHorizontal: 10,
                }}>
                (+91) 9787-760-000
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                Linking.openURL('mailto:mrbrotherscbe@gmail.com');
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={14}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 16,
                  letterSpacing: 0.5,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  paddingHorizontal: 10,
                }}>
                mrbrotherscbe@gmail.com
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.softGrey,
              paddingVertical: 2,
              marginVertical: 20,
            }}></View>
          <View
            style={{width: '95%', flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 0,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E6F5F8',
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: Color.primary,
              }}>
              <Image
                source={require('../../assets/Logos/app_icon.png')}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  width: '95%',
                  fontSize: 18,
                  textAlign: 'left',
                  color: Color.primary,
                  letterSpacing: 0.5,
                  fontFamily: Manrope.SemiBold,
                  paddingVertical: 5,
                }}>
                MR Brothers
              </Text>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}
                numberOfLines={2}>
                India’s No.1 Trade is now a Superband
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.softGrey,
              paddingVertical: 2,
              marginVertical: 20,
            }}></View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginVertical: 0,
            }}>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AboutUs')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsandConditions')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                                onPress={() => Linking.openURL('http://www.mrbrothers.in/')}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        width: 5,
                                        height: 5,
                                        backgroundColor: '#666',
                                        borderRadius: 50,
                                    }}></View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#333',
                                        fontFamily: Manrope.Regular,
                                        paddingHorizontal: 5,
                                        textDecorationLine: 'underline',
                                        letterSpacing: 0.5,
                                    }}>
                                    Website
                                </Text>
                            </TouchableOpacity> */}
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderFooterItem's Free_rental : ", error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Color.primary}
        translucent={false}
        barStyle="light-content"
        networkActivityIndicatorVisible={true}
      />
      <View
        style={{
          width: scr_width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <FlatList
          data={privacyData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default PrivacyPolicy;
