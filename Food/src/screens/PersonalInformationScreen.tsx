import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProfile } from '../context/ProfileContext';
import { Picker } from '@react-native-picker/picker';
import { useLocalization } from '../hooks/useLocalization';
import { Chip } from '../components/Chip';
import { InfoSheet } from '../components/InfoSheet';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Notifications: undefined;
  PersonalInformation: undefined;
  DietPreferences: undefined;
  HealthGoals: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  sex: Yup.string().required('Sex is required'),
  height: Yup.number().required('Height is required'),
  weight: Yup.number().required('Weight is required'),
  targetWeight: Yup.number().optional(),
  activityLevel: Yup.string().required('Activity level is required'),
  bedtime: Yup.string().required('Bedtime is required'),
  wakeTime: Yup.string().required('Wake time is required'),
  chronicConditions: Yup.array().of(Yup.string()),
  medications: Yup.string(),
  allergies: Yup.array().of(Yup.string()),
});

const CHRONIC_CONDITIONS = [
  'Diabetes',
  'IBS',
  'Depression',
  'Anxiety',
  'Hypertension',
  'Heart Disease',
  'Thyroid Disorder',
  'PCOS',
  'Migraines',
  'Arthritis',
];

const ALLERGIES = [
  'Gluten',
  'Lactose',
  'Nuts',
  'Shellfish',
  'Eggs',
  'Soy',
  'Fish',
  'Sesame',
];

const PersonalInformationScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile, isLoading } = useProfile();
  const { isMetric } = useLocalization();
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [infoField, setInfoField] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (values: any) => {
    try {
      setError(null);
      await updateProfile(values);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Personal Information</Text>
        <View style={styles.headerRight} />
      </View>

      {error && (
        <View style={[styles.errorContainer, { backgroundColor: colors.error + '20' }]}>
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}

      <Formik
        initialValues={{
          fullName: profile.fullName || '',
          dateOfBirth: profile.dateOfBirth || new Date(),
          sex: profile.sex || '',
          height: profile.height?.toString() || '',
          weight: profile.weight?.toString() || '',
          targetWeight: profile.targetWeight?.toString() || '',
          activityLevel: profile.activityLevel || '',
          bedtime: profile.bedtime || '',
          wakeTime: profile.wakeTime || '',
          chronicConditions: profile.chronicConditions || [],
          medications: profile.medications || '',
          allergies: profile.allergies || [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView style={styles.scrollView}>
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Full name</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('fullName');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  }]}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.text + '80'}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={[styles.error, { color: colors.error }]}>{errors.fullName}</Text>
                )}
              </View>

              {/* Date of Birth */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Date of birth</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('dateOfBirth');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <DateTimePicker
                  value={values.dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    if (date) setFieldValue('dateOfBirth', date);
                  }}
                />
              </View>

              {/* Sex */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Sex</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('sex');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
                  <Picker
                    selectedValue={values.sex}
                    onValueChange={handleChange('sex')}
                    style={{ color: colors.text }}
                  >
                    <Picker.Item label="Select sex" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              {/* Height */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Height</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('height');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  }]}
                  onChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  value={values.height}
                  placeholder={`Enter height in ${isMetric ? 'cm' : 'ft-in'}`}
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                />
              </View>

              {/* Weight */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Current weight</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('weight');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  }]}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  value={values.weight}
                  placeholder={`Enter weight in ${isMetric ? 'kg' : 'lb'}`}
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                />
              </View>

              {/* Target Weight */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Target weight (optional)</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('targetWeight');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  }]}
                  onChangeText={handleChange('targetWeight')}
                  onBlur={handleBlur('targetWeight')}
                  value={values.targetWeight}
                  placeholder={`Enter target weight in ${isMetric ? 'kg' : 'lb'}`}
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                />
              </View>

              {/* Activity Level */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Activity level</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('activityLevel');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <View style={styles.activityLevels}>
                  {['Sedentary', 'Light', 'Moderate', 'Active', 'Athlete'].map((level) => (
                    <Pressable
                      key={level}
                      style={[
                        styles.activityButton,
                        {
                          backgroundColor: values.activityLevel === level.toLowerCase()
                            ? colors.primary
                            : colors.card,
                        },
                      ]}
                      onPress={() => setFieldValue('activityLevel', level.toLowerCase())}
                    >
                      <Text
                        style={[
                          styles.activityButtonText,
                          {
                            color: values.activityLevel === level.toLowerCase()
                              ? 'white'
                              : colors.text,
                          },
                        ]}
                      >
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Sleep Schedule */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Typical bedtime</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('bedtime');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <DateTimePicker
                  value={values.bedtime ? new Date(values.bedtime) : new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, time) => {
                    if (time) setFieldValue('bedtime', time.toISOString());
                  }}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Typical wake time</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('wakeTime');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <DateTimePicker
                  value={values.wakeTime ? new Date(values.wakeTime) : new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, time) => {
                    if (time) setFieldValue('wakeTime', time.toISOString());
                  }}
                />
              </View>

              {/* Chronic Conditions */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Chronic conditions</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('chronicConditions');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <View style={styles.chipContainer}>
                  {CHRONIC_CONDITIONS.map((condition) => (
                    <Chip
                      key={condition}
                      label={condition}
                      selected={values.chronicConditions.includes(condition)}
                      onPress={() => {
                        const newConditions = values.chronicConditions.includes(condition)
                          ? values.chronicConditions.filter(c => c !== condition)
                          : [...values.chronicConditions, condition];
                        setFieldValue('chronicConditions', newConditions);
                      }}
                    />
                  ))}
                </View>
              </View>

              {/* Medications */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Medications & supplements</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('medications');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  }]}
                  onChangeText={handleChange('medications')}
                  onBlur={handleBlur('medications')}
                  value={values.medications}
                  placeholder="List your medications and supplements"
                  placeholderTextColor={colors.text + '80'}
                  multiline
                />
              </View>

              {/* Allergies */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={[styles.label, { color: colors.text }]}>Allergies & intolerances</Text>
                  <Pressable 
                    onPress={() => {
                      setInfoField('allergies');
                      setShowInfoSheet(true);
                    }}
                  >
                    <Icon name="information-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
                <View style={styles.chipContainer}>
                  {ALLERGIES.map((allergy) => (
                    <Chip
                      key={allergy}
                      label={allergy}
                      selected={values.allergies.includes(allergy)}
                      onPress={() => {
                        const newAllergies = values.allergies.includes(allergy)
                          ? values.allergies.filter(a => a !== allergy)
                          : [...values.allergies, allergy];
                        setFieldValue('allergies', newAllergies);
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>

      <InfoSheet
        visible={showInfoSheet}
        onClose={() => setShowInfoSheet(false)}
        field={infoField}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
  activityLevels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activityButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PersonalInformationScreen; 