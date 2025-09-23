import React, { useState } from 'react';
import { XIcon, CheckIcon, AlertCircleIcon, BookOpenIcon, CheckCircle2Icon } from 'lucide-react';
import { toast } from 'react-toastify';
type AddTeamMemberModalProps = {
  onClose: () => void;
  onAddMember: (member: any) => void;
};
const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  onClose,
  onAddMember
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Sales Representative',
    department: 'Sales',
    startDate: '',
    manager: '',
    sendInvite: true,
    selectedModules: [] as string[],
    selectedPaths: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  // Sample managers for the dropdown
  const managers = [{
    id: '1',
    name: 'Jessica Thompson',
    role: 'Sales Director'
  }, {
    id: '2',
    name: 'David Wilson',
    role: 'Regional Sales Manager'
  }, {
    id: '3',
    name: 'Amanda Martinez',
    role: 'Sales Team Lead'
  }, {
    id: '4',
    name: 'Robert Chen',
    role: 'Senior Sales Manager'
  }];
  // Sample learning modules
  const learningModules = [{
    id: 'mod1',
    name: 'Sales Fundamentals',
    duration: '2 hours',
    category: 'Required'
  }, {
    id: 'mod2',
    name: 'Product Knowledge Basics',
    duration: '1.5 hours',
    category: 'Required'
  }, {
    id: 'mod3',
    name: 'Discovery Call Techniques',
    duration: '3 hours',
    category: 'Recommended'
  }, {
    id: 'mod4',
    name: 'Objection Handling',
    duration: '2.5 hours',
    category: 'Recommended'
  }, {
    id: 'mod5',
    name: 'Advanced Negotiation',
    duration: '4 hours',
    category: 'Optional'
  }, {
    id: 'mod6',
    name: 'Closing Techniques',
    duration: '2 hours',
    category: 'Recommended'
  }];
  // Sample learning paths
  const learningPaths = [{
    id: 'path1',
    name: 'New Hire Onboarding',
    duration: '2 weeks',
    modules: 5
  }, {
    id: 'path2',
    name: 'Sales Methodology',
    duration: '4 weeks',
    modules: 8
  }, {
    id: 'path3',
    name: 'Product Specialist Track',
    duration: '6 weeks',
    modules: 12
  }, {
    id: 'path4',
    name: 'Advanced Sales Skills',
    duration: '8 weeks',
    modules: 10
  }];
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    if (type === 'checkbox' && name !== 'sendInvite') {
      // Handle module and path checkboxes
      if (name.startsWith('module-')) {
        const moduleId = name.replace('module-', '');
        setFormData(prev => {
          const currentSelected = [...prev.selectedModules];
          if ((e.target as HTMLInputElement).checked) {
            if (!currentSelected.includes(moduleId)) {
              currentSelected.push(moduleId);
            }
          } else {
            const index = currentSelected.indexOf(moduleId);
            if (index !== -1) {
              currentSelected.splice(index, 1);
            }
          }
          return {
            ...prev,
            selectedModules: currentSelected
          };
        });
      } else if (name.startsWith('path-')) {
        const pathId = name.replace('path-', '');
        setFormData(prev => {
          const currentSelected = [...prev.selectedPaths];
          if ((e.target as HTMLInputElement).checked) {
            if (!currentSelected.includes(pathId)) {
              currentSelected.push(pathId);
            }
          } else {
            const index = currentSelected.indexOf(pathId);
            if (index !== -1) {
              currentSelected.splice(index, 1);
            }
          }
          return {
            ...prev,
            selectedPaths: currentSelected
          };
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      });
    }
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      // Module selection is non-mandatory, so always proceed
      setStep(4);
    } else if (step === 4) {
      handleSubmit();
    }
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = () => {
    // Final validation for step 4
    if (step === 4) {
      // Create new team member object
      const newMember = {
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: formData.role,
        status: 'active',
        progress: {
          completion: 0,
          quizAvg: 0,
          overdue: 0
        },
        skills: [],
        certifications: [],
        joinDate: formData.startDate,
        lastActive: new Date().toISOString().split('T')[0],
        manager: formData.manager,
        assignedModules: formData.selectedModules.map(id => learningModules.find(module => module.id === id)),
        assignedPaths: formData.selectedPaths.map(id => learningPaths.find(path => path.id === id))
      };
      // Submit the new member
      onAddMember(newMember);
      if (formData.sendInvite) {
        toast.success(`Invitation email sent to ${formData.email}`);
      }
      // Show success step
      setSubmitted(true);
      setStep(5);
    }
  };
  const getSelectedModulesCount = () => {
    return formData.selectedModules.length + formData.selectedPaths.length;
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-medium text-gray-900">Add Team Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div>
          <div className="p-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`w-12 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`w-12 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <div className={`w-12 h-1 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  4
                </div>
                <div className={`w-12 h-1 ${step >= 5 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 5 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  5
                </div>
              </div>
            </div>
            {/* Step 1: Basic Information */}
            {step === 1 && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={`mt-1 block w-full border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={`mt-1 block w-full border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                    {errors.email && <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>}
                  </div>
                </div>
              </div>}
            {/* Step 2: Role and Department */}
            {step === 2 && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Role and Department
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className={`mt-1 block w-full border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}>
                      <option value="Sales Representative">
                        Sales Representative
                      </option>
                      <option value="Senior Sales Representative">
                        Senior Sales Representative
                      </option>
                      <option value="Account Executive">
                        Account Executive
                      </option>
                      <option value="Senior Account Executive">
                        Senior Account Executive
                      </option>
                      <option value="Sales Manager">Sales Manager</option>
                    </select>
                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select id="department" name="department" value={formData.department} onChange={handleChange} className={`mt-1 block w-full border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Customer Success">Customer Success</option>
                      <option value="Support">Support</option>
                    </select>
                    {errors.department && <p className="mt-1 text-sm text-red-600">
                        {errors.department}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className={`mt-1 block w-full border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                    {errors.startDate && <p className="mt-1 text-sm text-red-600">
                        {errors.startDate}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                      Manager
                    </label>
                    <select id="manager" name="manager" value={formData.manager} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option value="">Select a manager</option>
                      {managers.map(manager => <option key={manager.id} value={manager.name}>
                          {manager.name} ({manager.role})
                        </option>)}
                    </select>
                  </div>
                </div>
              </div>}
            {/* Step 3: Learning Modules/Paths (Optional) */}
            {step === 3 && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Assign Learning Content{' '}
                  <span className="text-sm font-normal text-gray-500">
                    (Optional)
                  </span>
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Select learning modules and paths to assign to this team
                      member. This step is optional and can be configured later.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Learning Paths
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {learningPaths.map(path => <div key={path.id} className="border rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-center">
                            <input id={`path-${path.id}`} name={`path-${path.id}`} type="checkbox" checked={formData.selectedPaths.includes(path.id)} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor={`path-${path.id}`} className="ml-3 block cursor-pointer">
                              <span className="font-medium text-gray-900">
                                {path.name}
                              </span>
                              <div className="text-sm text-gray-500">
                                <span>{path.duration}</span>
                                <span className="mx-1">•</span>
                                <span>{path.modules} modules</span>
                              </div>
                            </label>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Individual Modules
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {learningModules.map(module => <div key={module.id} className="border rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-center">
                            <input id={`module-${module.id}`} name={`module-${module.id}`} type="checkbox" checked={formData.selectedModules.includes(module.id)} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor={`module-${module.id}`} className="ml-3 block cursor-pointer">
                              <span className="font-medium text-gray-900">
                                {module.name}
                              </span>
                              <div className="text-sm text-gray-500">
                                <span>{module.duration}</span>
                                <span className="mx-1">•</span>
                                <span className={`${module.category === 'Required' ? 'text-red-600' : module.category === 'Recommended' ? 'text-blue-600' : 'text-gray-500'}`}>
                                  {module.category}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>}
            {/* Step 4: Review and Confirm */}
            {step === 4 && <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Review and Confirm
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Please review the information below before adding this
                      team member.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.role}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Department
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.department}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Start Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.startDate}
                      </dd>
                    </div>
                    {formData.manager && <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Manager
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formData.manager}
                        </dd>
                      </div>}
                    {getSelectedModulesCount() > 0 && <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 mb-2">
                          Assigned Learning Content
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formData.selectedPaths.length > 0 && <div className="mb-2">
                              <p className="font-medium text-xs text-gray-700 uppercase mb-1">
                                Learning Paths:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                {formData.selectedPaths.map(pathId => {
                          const path = learningPaths.find(p => p.id === pathId);
                          return path ? <li key={path.id}>{path.name}</li> : null;
                        })}
                              </ul>
                            </div>}
                          {formData.selectedModules.length > 0 && <div>
                              <p className="font-medium text-xs text-gray-700 uppercase mb-1">
                                Individual Modules:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                {formData.selectedModules.map(moduleId => {
                          const module = learningModules.find(m => m.id === moduleId);
                          return module ? <li key={module.id}>{module.name}</li> : null;
                        })}
                              </ul>
                            </div>}
                        </dd>
                      </div>}
                  </dl>
                </div>
                <div className="flex items-center">
                  <input id="sendInvite" name="sendInvite" type="checkbox" checked={formData.sendInvite} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="sendInvite" className="ml-2 block text-sm text-gray-900">
                    Send invitation email to this team member
                  </label>
                </div>
              </div>}
            {/* Step 5: Success Confirmation */}
            {step === 5 && <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircle2Icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Team Member Added Successfully!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {formData.firstName} {formData.lastName} has been added to
                  your team.
                  {formData.sendInvite && ' An invitation email has been sent to their email address.'}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto text-left">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Next steps:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>
                        Customize their learning path in the team member details
                        page
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>
                        Monitor their progress in the Team Overview dashboard
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BookOpenIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <span>
                        Schedule a welcome call to introduce them to the team
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button type="button" onClick={onClose} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Done
                  </button>
                  <button type="button" onClick={() => {
                // Reset form for a new team member
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  role: 'Sales Representative',
                  department: 'Sales',
                  startDate: '',
                  manager: '',
                  sendInvite: true,
                  selectedModules: [],
                  selectedPaths: []
                });
                setStep(1);
                setSubmitted(false);
              }} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Another Team Member
                  </button>
                </div>
              </div>}
          </div>
          {step < 5 && <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
              {step > 1 ? <button type="button" onClick={handleBack} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back
                </button> : <div></div>}
              <div>
                <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3">
                  Cancel
                </button>
                <button type="button" onClick={handleNext} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  {step < 4 ? 'Next' : <span className="flex items-center">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Add Team Member
                    </span>}
                </button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default AddTeamMemberModal;