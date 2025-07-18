import 'package:flutter/material.dart';

enum BuiButtonStyleType { filled, outline }
enum BuiButtonSize { small, medium, large }

class BuiButton extends StatelessWidget {
  final String label;
  final BuiButtonStyleType styleType;
  final BuiButtonSize size;
  final VoidCallback? onPressed;
  final bool disabled;

  const BuiButton({
    super.key,
    required this.label,
    this.styleType = BuiButtonStyleType.filled,
    this.size = BuiButtonSize.medium,
    this.onPressed,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: _getButtonWidth(),
      height: _getButtonHeight(),
      child: ElevatedButton(
        onPressed: disabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: _getBackgroundColor(),
          foregroundColor: _getForegroundColor(),
          side: styleType == BuiButtonStyleType.outline
              ? BorderSide(color: _getBorderColor(), width: 2)
              : null,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: styleType == BuiButtonStyleType.filled ? 2 : 0,
          padding: _getPadding(),
          disabledBackgroundColor: Colors.grey.withOpacity(0.3),
          disabledForegroundColor: Colors.grey.withOpacity(0.5),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: _getFontSize(),
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
        ),
      ),
    );
  }

  double _getButtonWidth() {
    switch (size) {
      case BuiButtonSize.small:
        return 120;
      case BuiButtonSize.medium:
        return 160;
      case BuiButtonSize.large:
        return 200;
    }
  }

  double _getButtonHeight() {
    switch (size) {
      case BuiButtonSize.small:
        return 40;
      case BuiButtonSize.medium:
        return 48;
      case BuiButtonSize.large:
        return 56;
    }
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case BuiButtonSize.small:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 8);
      case BuiButtonSize.medium:
        return const EdgeInsets.symmetric(horizontal: 24, vertical: 12);
      case BuiButtonSize.large:
        return const EdgeInsets.symmetric(horizontal: 32, vertical: 16);
    }
  }

  double _getFontSize() {
    switch (size) {
      case BuiButtonSize.small:
        return 14;
      case BuiButtonSize.medium:
        return 16;
      case BuiButtonSize.large:
        return 18;
    }
  }

  Color _getBackgroundColor() {
    if (disabled) return Colors.grey.withOpacity(0.3);
    
    switch (styleType) {
      case BuiButtonStyleType.filled:
        return const Color(0xFF667eea);
      case BuiButtonStyleType.outline:
        return Colors.transparent;
    }
  }

  Color _getForegroundColor() {
    if (disabled) return Colors.grey.withOpacity(0.5);
    
    switch (styleType) {
      case BuiButtonStyleType.filled:
        return Colors.white;
      case BuiButtonStyleType.outline:
        return const Color(0xFF667eea);
    }
  }

  Color _getBorderColor() {
    if (disabled) return Colors.grey.withOpacity(0.3);
    return const Color(0xFF667eea);
  }
} 