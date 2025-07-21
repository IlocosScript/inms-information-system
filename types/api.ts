// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
  roles: string[];
  member?: Member;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  memberId: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Member Types
export interface Member {
  memberId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthday?: string;
  gender: string;
  address: string;
  pmaNumber: string;
  licenseNumber: string;
  specialty: Specialty;
  subspecialty?: Specialty;
  hospital?: Hospital;
  clinicAddress?: string;
  clinicHours?: string;
  clinicPhone?: string;
  membershipType: MembershipType;
  status: MembershipStatus;
  joinDate: string;
  profileImageUrl?: string;
  roles: Role[];
  emergencyContact?: EmergencyContact;
}

export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday?: string;
  gender: string;
  address: string;
  pmaNumber: string;
  licenseNumber: string;
  specialtyId: number;
  subspecialtyId?: number;
  hospitalId?: number;
  clinicAddress?: string;
  clinicHours?: string;
  clinicPhone?: string;
  membershipType: MembershipType;
  emergencyContact?: EmergencyContact;
}

export interface UpdateMemberRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  address?: string;
  subspecialtyId?: number;
  hospitalId?: number;
  clinicAddress?: string;
  clinicHours?: string;
  clinicPhone?: string;
  emergencyContact?: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// Event Types
export interface Event {
  eventId: number;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  venue: string;
  venueAddress?: string;
  eventType: EventType;
  specialty?: Specialty;
  hospital?: Hospital;
  cmePoints: number;
  maxCapacity?: number;
  registrationFee?: number;
  registrationDeadline: string;
  status: EventStatus;
  createdBy: Member;
  createdAt: string;
  registrationCount: number;
  isRegistered: boolean;
  speakers: EventSpeaker[];
  attachments: EventAttachment[];
}

export interface CreateEventRequest {
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  venue: string;
  venueAddress?: string;
  eventType: EventType;
  specialtyId?: number;
  hospitalId?: number;
  cmePoints: number;
  maxCapacity?: number;
  registrationFee?: number;
  registrationDeadline: string;
  speakers?: CreateEventSpeakerRequest[];
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  venueAddress?: string;
  eventType?: EventType;
  specialtyId?: number;
  hospitalId?: number;
  cmePoints?: number;
  maxCapacity?: number;
  registrationFee?: number;
  registrationDeadline?: string;
  status?: EventStatus;
}

export interface EventSpeaker {
  eventSpeakerId: number;
  name: string;
  title?: string;
  organization?: string;
  biography?: string;
  profileImageUrl?: string;
  displayOrder: number;
}

export interface CreateEventSpeakerRequest {
  name: string;
  title?: string;
  organization?: string;
  biography?: string;
  profileImageUrl?: string;
  displayOrder: number;
}

export interface EventAttachment {
  attachmentId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  description?: string;
  uploadedAt: string;
}

export interface EventRegistration {
  registrationId: number;
  event: Event;
  member: Member;
  status: RegistrationStatus;
  registrationDate: string;
  attendanceDate?: string;
  amountPaid?: number;
  paymentDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
}

export interface CreateEventRegistrationRequest {
  eventId: number;
  notes?: string;
}

// Announcement Types
export interface Announcement {
  announcementId: number;
  title: string;
  content: string;
  type: AnnouncementType;
  priority: Priority;
  eventDate?: string;
  eventVenue?: string;
  author: Member;
  publishDate: string;
  expiryDate?: string;
  isEmailSent: boolean;
  status: AnnouncementStatus;
  createdAt: string;
  attachments: AnnouncementAttachment[];
  isBookmarked: boolean;
  userResponse?: ResponseType;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  type: AnnouncementType;
  priority: Priority;
  eventDate?: string;
  eventVenue?: string;
  expiryDate?: string;
  sendEmail?: boolean;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
  type?: AnnouncementType;
  priority?: Priority;
  eventDate?: string;
  eventVenue?: string;
  expiryDate?: string;
  status?: AnnouncementStatus;
}

export interface AnnouncementAttachment {
  attachmentId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface AnnouncementResponseRequest {
  announcementId: number;
  responseType: ResponseType;
  notes?: string;
}

// CME Types
export interface CMEPoint {
  cmePointId: number;
  member: Member;
  activityName: string;
  activityType: CMEActivityType;
  activityDate: string;
  points: number;
  venue?: string;
  organizer?: string;
  status: CMEStatus;
  certificateNumber?: string;
  certificateUrl?: string;
  event?: Event;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: Member;
}

export interface CreateCMEPointRequest {
  activityName: string;
  activityType: CMEActivityType;
  activityDate: string;
  points: number;
  venue?: string;
  organizer?: string;
  certificateNumber?: string;
  certificateUrl?: string;
  eventId?: number;
}

export interface COGSRequest {
  cogsRequestId: number;
  member: Member;
  year: number;
  totalPoints: number;
  status: COGSStatus;
  requestDate: string;
  approvedDate?: string;
  approvedBy?: Member;
  certificateNumber?: string;
  certificateUrl?: string;
  notes?: string;
}

export interface CreateCOGSRequestRequest {
  year: number;
  notes?: string;
}

// Gallery Types
export interface GalleryAlbum {
  albumId: number;
  title: string;
  description: string;
  eventDate: string;
  eventName: string;
  venue: string;
  photographer: string;
  category: GalleryCategory;
  views: number;
  likes: number;
  createdBy: Member;
  createdAt: string;
  images: GalleryImage[];
  isLiked: boolean;
}

export interface CreateGalleryAlbumRequest {
  title: string;
  description: string;
  eventDate: string;
  eventName: string;
  venue: string;
  photographer: string;
  category: GalleryCategory;
}

export interface GalleryImage {
  imageId: number;
  fileName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  displayOrder: number;
  fileSize: number;
  uploadedAt: string;
}

// Message Types
export interface Message {
  messageId: number;
  sender: Member;
  receiver: Member;
  subject?: string;
  content: string;
  messageType: MessageType;
  isRead: boolean;
  readAt?: string;
  sentAt: string;
  parentMessage?: Message;
  replies: Message[];
  attachments: MessageAttachment[];
}

export interface CreateMessageRequest {
  receiverMemberId: number;
  subject?: string;
  content: string;
  messageType: MessageType;
  parentMessageId?: number;
}

export interface MessageAttachment {
  attachmentId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

// Dues Types
export interface MembershipDue {
  dueId: number;
  member: Member;
  dueType: DueType;
  description: string;
  amount: number;
  year: number;
  dueDate: string;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  receiptNumber?: string;
  createdAt: string;
}

export interface Payment {
  paymentId: number;
  member: Member;
  paymentType: PaymentType;
  due?: MembershipDue;
  eventRegistration?: EventRegistration;
  amount: number;
  paymentMethod: string;
  paymentReference: string;
  receiptNumber: string;
  status: PaymentStatus;
  paymentDate: string;
  notes?: string;
}

// Lookup Types
export interface Specialty {
  specialtyId: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface Hospital {
  hospitalId: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  isActive: boolean;
}

// Search and Pagination
export interface SearchFilter {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Enums
export enum MembershipType {
  Regular = 1,
  Associate = 2,
  Senior = 3,
  Emeritus = 4
}

export enum MembershipStatus {
  Active = 1,
  Inactive = 2,
  Suspended = 3,
  Pending = 4
}

export enum Role {
  Member = 1,
  Admin = 2,
  SuperAdmin = 3,
  Moderator = 4
}

export enum EventType {
  Conference = 1,
  Workshop = 2,
  Seminar = 3,
  Training = 4,
  Meeting = 5,
  Social = 6
}

export enum EventStatus {
  Draft = 1,
  Published = 2,
  RegistrationOpen = 3,
  RegistrationClosed = 4,
  InProgress = 5,
  Completed = 6,
  Cancelled = 7
}

export enum RegistrationStatus {
  Registered = 1,
  Attended = 2,
  NoShow = 3,
  Cancelled = 4,
  Waitlisted = 5
}

export enum AnnouncementType {
  General = 1,
  Event = 2,
  Urgent = 3,
  Dues = 4,
  CME = 5
}

export enum AnnouncementStatus {
  Draft = 1,
  Published = 2,
  Archived = 3
}

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}

export enum ResponseType {
  Attending = 1,
  NotAttending = 2,
  Maybe = 3,
  Read = 4
}

export enum CMEActivityType {
  Conference = 1,
  Workshop = 2,
  Seminar = 3,
  Training = 4,
  Research = 5,
  OnlineCourse = 6
}

export enum CMEStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

export enum COGSStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
  Issued = 4
}

export enum DueType {
  AnnualDues = 1,
  PMADues = 2,
  SpecialAssessment = 3,
  EventFee = 4,
  Merchandise = 5
}

export enum PaymentType {
  MembershipDues = 1,
  EventRegistration = 2,
  Merchandise = 3,
  Other = 4
}

export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Overdue = 3,
  Cancelled = 4,
  Refunded = 5
}

export enum MessageType {
  General = 1,
  Referral = 2,
  Consultation = 3,
  Administrative = 4
}

export enum GalleryCategory {
  Conference = 1,
  Workshop = 2,
  Social = 3,
  Awards = 4,
  Community = 5
}

export enum ResourceCategory {
  Guidelines = 1,
  Textbook = 2,
  Journal = 3,
  Reference = 4,
  Research = 5
}

export enum BookmarkType {
  Announcement = 1,
  Resource = 2
}