"use client";

import {
  Sparkles,
  Smile,
  Wrench,
  Crown,
  Activity,
  Baby,
  Stethoscope,
  ShieldPlus,
  Home,
  CalendarPlus,
  FileText,
  CreditCard,
  User,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  MapPin,
  Phone,
  Star,
  Plus,
  Download,
  Share2,
  Settings,
  LogOut,
  ChevronDown,
  X,
  CheckCircle2,
  Pill,
  FileHeart,
  Heart,
  Award,
  TrendingUp,
  Gift,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Filter,
  Calendar,
  Users,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronUp,
  MoreVertical,
  MessageCircle,
  QrCode,
  Copy,
  Info,
  Zap,
} from "lucide-react";

export const Icons = {
  Sparkles, Smile, Wrench, Crown, Activity, Baby, Stethoscope, ShieldPlus,
  Home, CalendarPlus, FileText, CreditCard, User, Bell, Search,
  ChevronLeft, ChevronRight, Check, Clock, MapPin, Phone, Star, Plus,
  Download, Share2, Settings, LogOut, ChevronDown, X, CheckCircle2,
  Pill, FileHeart, Heart, Award, TrendingUp, Gift, Wallet,
  ArrowRight, ArrowLeft, Trash2, Filter, Calendar, Users, Lock, Mail,
  Eye, EyeOff, ChevronUp, MoreVertical, MessageCircle, QrCode, Copy,
  Info, Zap,
};

export type IconName = keyof typeof Icons;

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = (Icons as Record<string, typeof Sparkles>)[name] ?? Sparkles;
  return <Icon className={className} />;
}
