//import liraries
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
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
const TermsandConditions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: scr_width}}>
            <Image
              source={require('../../assets/Banner/terms.jpg')}
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
                width: '100%',
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Greetings from MR Brothers!!!
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                What you value, we value as well. Indeed, jewels have greater
                value to us than their actual worth. This idea is always
                ingrained in our value system and is extremely carefully upheld.
                Please take time to carefully review the conditions of our
                business and learn about the products and services we offer.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                MR Brothers is the owner and operator of the website, and its
                registered office is in Coimbatore, Tamilnadu, India.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Annotation
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The term "Jewellery" or "jewels" refers to any customized,
                designed, or pre-designed jewels made of gold or other precious
                metals, including coins made of gold, with or without stones or
                other precious factors. Any precious and semi-precious stones,
                such as diamonds, emeralds, pearls, etc., are referred to as
                "stones."{' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Although users of this website are referred to as "User," "You,"
                "your," and "Customer," registered users and customers are
                referred to as "members" or "registered members." Any item that
                the member pays for and is meant to be delivered to a different
                person at a different address is deemed a "gift."{' '}
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              User Agreement
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Policies are a set of rules and regulations designed to foster a
                fair and secure trade environment for all of its clients. The
                main policy is the User Agreement. It is the responsibility of
                each user or member to read over, comprehend, and abide by our
                policies, as well as any applicable laws and regulations
                pertaining to these conditions.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Amendments
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                As per the relevant and prevalent laws of India, the user
                agreement must be interpreted. The Information Technology
                Amendment Act, 2008, also known as ITAA 2008, was amended by the
                Indian government and focuses on data protection,
                cyberterrorism, and information security. These amendments are
                followed by the website policies. We will adhere to the
                Reasonable Security Practices and Sensitive Personal Information
                listed in section 43A of the ITAA, 2008.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Eligibility Criteria
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                This website is not available to users who are considered to be
                "incompetent to contract" as per the Indian Contract Act of
                1872. It is prohibited for anybody under the age of 18 to use,
                purchase anything from, or enter into a contract via our
                website.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Registration Obligation
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                All user-provided data must be truthful, accurate, up-to-date,
                full, and true as stipulated by our registration process. We
                reserve the right to cancel, suspend, or terminate the
                membership and restrict access to our website indefinitely if
                the user provides any information that does not meet the
                above-stated criteria, or if the management of MR Brothers has a
                reasonable cause to suspect or consider that the information
                provided by you is false, deviates from the criteria, or is not
                per the user agreement.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Registration
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                It only takes a few basic steps to register with MR Brothers,
                and there is no payment involved.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Contact & Personal Information
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The user is required to submit personal data, like name,
                address, and phone number. Date of Birth is one of the personal
                details that we utilize to confirm the user's age. It is always
                recommended to keep your login information private and to update
                your password regularly to maintain security.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Users can modify their personally identifiable information,
                including the login password, in their profile after registering
                by logging into their account.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Email Verification
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Users must give their email address, which will be used for
                communication with (URL). The user must check their email, which
                contains instructions on how to register and facilitates the
                registration process.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Confirm User Registration
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                To confirm the user’s login ID and registration, admin approval
                from MR Brothers is required. A One Time Password (OTP) will be
                sent to the user’s registered mobile number for verification.
                Once the user receives the notification on the confirmation of
                approval from our administration, your Login ID will be created.{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                It is to be noted that the activation of the user account will
                be available for a particular time and will be deactivated after
                the selection of the required products. This action is proceeded
                as a part of high security.
              </Text>
            </View>
          </View>
          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Acceptance of User Agreement & Privacy Policy
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                After reading the privacy policy and user agreement, make sure
                you agree to its terms and conditions by checking the box and
                entering into a contract. To proceed with registration, you must
                agree to the contract; otherwise, you will not be allowed to
                access the website.
              </Text>
            </View>
          </View>
          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Create User Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Users cannot log in or make purchases without their User ID. You
                can create a username and password. The availability of the user
                name determines the choice of User ID. Use the 'Forgot Password'
                link on the login page if you ever forget your password. You
                will be requested to provide your email address.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                A message containing the link to reset your password will be
                sent to you when you enter your email address and click the
                "Submit" button. It is recommended that you create (or reset) a
                strong password using a mix of alphanumeric characters, special
                characters, and letters.
              </Text>
            </View>
          </View>
          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Tax and Value Added Charges
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                According to the current Government of India regulations, all
                Jewels, whether they are billed in Gold, Silver, Diamond, or any
                other precious metal, with or without precious or semi-precious
                stones, will be subject to GST, which will replace the tax
                system that was in place until June 2017.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                For your comparative analysis with the current pattern, here is
                a summary of the prior tax pattern. The total tax rate on gold
                jewellery was 2% before the GST was enacted (1% excise duty and
                1% VAT). The excise duty and VAT components have been replaced
                with the GST, which is a single, 3% tax. From here on, this tax
                will be referred to as the "tax" or "taxes."
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The price of the jewel comprises the actual value of the stones,
                the cost of designing and manufacturing, and any waste. It is
                entirely within the rights of MR Brothers to set the product's
                price. We will refer to these expenses as "Value Added Charges."
              </Text>
            </View>
          </View>
          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              Termination of Agreement
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                If any user is discovered to have violated the terms and
                conditions or privacy policy in any way, the management has the
                authority to cancel their membership and their agreement. It is
                not required of us to notify members in advance of canceling
                their memberships and preventing them from using the website.{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
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
                In the case that membership is terminated, the member shall
                erase or destroy any downloaded or copied data under the terms
                of the user agreement. Your commitment to make any remaining
                payments towards the purchase of the product remains unaffected
                by the termination of your membership.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'left',
                lineHeight: 20,
              }}>
              The following terms of use apply to the usage of this website:
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The information on these pages and in the mobile apps is solely
                for your general use and information. Changes may occur without
                prior warning.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The accuracy, timeliness, performance, completeness, and
                suitability of the information and materials found or offered on
                this website for any specific purpose are not warranted or
                guaranteed by us or any third parties.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                You understand that such materials and information may contain
                mistakes or inaccuracies, and to the maximum extent allowed by
                law, we specifically disclaim any liability for any such errors
                or inaccuracies.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We disclaim all liability for any use of information or content
                on this website, which you make at your own risk. You will be
                solely responsible for making sure that any goods or information
                obtained from this website fulfill your unique needs.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                The content on this website is licensed to us. This content
                consists of, but is not restricted to, the layout, appearance,
                look, and visuals. Except as permitted by the copyright notice
                that is a part of these terms and conditions, reproduction is
                not allowed.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Owing to photographic techniques and screen defaults, certain
                objects may appear larger or smaller than their true dimensions.
                In certain instances, the elements can be shown smaller for a
                full view or larger for more clarity. The company is not
                accountable for any legal action arising from this situation.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Any trademarks that are cited on this website or in its mobile
                applications but are not under license or ownership of the
                operator are credited there.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Unauthorized use of this website or its mobile applications
                could result in a criminal crime, a demand for damages, or both.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                This website and its mobile apps may occasionally have links to
                other websites and their mobile apps. We've included these
                websites for your convenience to get more details. They do not
                imply our endorsement of the mobile apps or website. The
                websites and mobile apps to which we provide links are not under
                our control.
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
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'left',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Without our authorization, you are not permitted to make a link
                to this website or its mobile applications from any other
                website or document.
              </Text>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Terms_Cond : ", error);
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
                Linking.openURL('tel:9787760000');
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
      console.log("catch in renderFooterItem's Terms_Cond : ", error);
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
          width: '100%',
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
export default TermsandConditions;
